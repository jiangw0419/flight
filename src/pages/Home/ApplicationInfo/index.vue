<template>
  <div class="app-info">
    <span>应用信息</span>
    <a-tabs v-model:activeKey="activeKey">
      <!--      包管理-->
      <a-tab-pane key="1" tab="包管理">
        <div>
          <a-upload-dragger
              :fileList="fileList"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              :customRequest="customRequest"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">点击或者拖拽apk到这里上传</p>
          </a-upload-dragger>
          <a-progress :percent="percent" v-if="progressShow"/>
          <!--对话框 -start-->
          <a-modal
              v-model:visible="visible"
              title="版本描述"
              @ok="handleOk"
          >
            <p style="margin-bottom: 10px">{{ appFileName }}</p>
            <a-textarea v-model:value="appDesc" placeholder="请输入版本描述信息" allow-clear/>
          </a-modal>
          <!--对话框 -end-->

          <a-tabs v-model:activeKey="activeChildKey" type="card" @change="tabChange">
            <a-tab-pane :forceRender="true" key="1" tab="全部">
              <AppInfoList ref="sonRef" :app-id="appId" :platform="0"></AppInfoList>
            </a-tab-pane>
            <a-tab-pane :forceRender="true" key="2" tab="android">
              <AppInfoList ref="sonRef1" :app-id="appId" :platform="1"></AppInfoList>
            </a-tab-pane>
            <a-tab-pane :forceRender="true" key="3" tab="iOS">
              <AppInfoList ref="sonRef2" :app-id="appId" :platform="2"></AppInfoList>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-tab-pane>
      <!--  基本信息    -->
      <a-tab-pane key="2" tab="基本信息" force-render>
        <BasicAppInfo :app-info="appInfo" :is-show-pencil="true" :is-reset-data="false" :is-cancel-hide-submit="true"
                      :is-can-modify="false" :successCallBack="queryApp"></BasicAppInfo>
      </a-tab-pane>

      <!--      成员管理-->
      <a-tab-pane key="3" tab="成员管理">
        <UserList :user-list="userList"></UserList>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {InboxOutlined} from "@ant-design/icons-vue";
import AppInfoList from "@/components/AppInfoList";
import BasicAppInfo from "@/components/BasicAppInfo";
import UserList from "@/components/UserList";
import {useRoute} from "vue-router";
import {fileUpload, queryAppById} from "@/utils/service";
import {parser} from "@/utils/fileUtils";
import {message} from "ant-design-vue";
import {useStore} from "vuex";

export default {
  name: "index",
  components: {
    InboxOutlined,
    AppInfoList,
    BasicAppInfo,
    UserList
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      sonRef: null,
      sonRef1: null,
      sonRef2: null,
      appId: route.params.id,
      activeKey: '1',
      activeChildKey: '1',
      fileList: [],
      userList: [],
      appInfo: null,

      appFileName: '',
      visible: false,
      appDesc: '',
      isCanUpload: false,
      progressShow: false,
      percent: 0,
    })
    //对话框
    const showModal = () => {
      state.visible = true
    }
    const handleOkBefore = () => {
      //隐藏对话框
      state.visible = false;
      //设置能够上传
      state.isCanUpload = true
      //显示进度条
      state.progressShow = true
    }
    const handleOk = () => {
      handleOkBefore()
      customRequest()
    }
    const handleOkAfter = () => {
      //隐藏进度条
      state.progressShow = false
      //重置能够上传标识
      state.isCanUpload = false
      //清空描述
      state.appDesc = ""
      //重新查询列表
      queryAppList()

    }

    //上传前校验文件类型
    const beforeUpload = async (file) => {
      state.fileList = [file]
      state.appFileName = file.name
      //判断包名是否一致
      let result = await parser(file)
      if (result) {
        let packageName = result.package || result.CFBundleIdentifier
        console.log("----->>>>>>>", packageName, state.appInfo.packageName)
        if (packageName === state.appInfo.packageName) {
          showModal()
        } else {
          message.warn("包名不匹配")
        }
      } else {
        message.warn("文件格式不匹配")
      }
      return false
    }

    //自定义上传
    const customRequest = async () => {
      //对话框隐藏，才执行上传
      if (state.isCanUpload) {
        let file = state.fileList[0]
        console.log("------>>>file=", file)
        let result = await parser(file)
        let label = result.CFBundleDisplayName || result.application.label
        let icon = result.icon
        let packageName = result.package || result.CFBundleIdentifier
        let versionCode = result.versionCode || result.mobileProvision.Version
        let versionName = result.versionName || result.CFBundleShortVersionString
        // console.log("---》》label=", label)
        // console.log("---》》icon=", icon)
        // console.log("---》》package=", packageName)
        // console.log("---》》versionCode=", versionCode)
        // console.log("---》》versionName=", versionName)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("label", label)
        formData.append("icon", icon)
        formData.append("packageName", packageName)
        formData.append("versionCode", versionCode)
        formData.append("versionName", versionName)
        formData.append("appDesc", state.appDesc)
        formData.append("appId", state.appInfo.id)
        formData.append("userAccount", store.state.user.userInfo.userAccount)

        let uploadResult = await fileUpload(formData, {
          onUploadProgress({total, loaded}) {
            console.log("------e>>>>", total, loaded)
            let progress = Math.round(loaded * 100 / total).toFixed(2)
            console.log("=======>>progress==", progress)
            state.percent = Number(progress)
          }
        })
        console.log("=======>>>>", uploadResult)
        handleOkAfter()
      }
    }

    //查询app基础信息
    const queryApp = async () => {
      const id = route.params.id
      let result = await queryAppById({id})
      state.appInfo = result[0]
      console.log("=======>>>appInfp=", result[0])
      await queryAppList()
    }

    //筛选
    const tabChange = () => {
      queryAppList()
    }
    //调用子组件的方法
    const queryAppList = () => {
      if ("1" === state.activeChildKey) {
        state.sonRef.queryAppList()
      } else if ("2" === state.activeChildKey) {
        state.sonRef1.queryAppList()
      } else if ("3" === state.activeChildKey) {
        state.sonRef2.queryAppList()
      }
    }

    onMounted(() => {
      state.currentPage = 1
      queryApp()
    })

    return ({
      ...toRefs(state),
      queryApp,
      customRequest,
      beforeUpload,
      showModal,
      handleOk,
      tabChange,
      queryAppList
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>