<template>
  <div class="app-info-group">
    <div class="item-head">
      <div>
        <span>版本号</span>
      </div>
      <span>id</span>
      <span>状态</span>
      <span>平台</span>
      <span>版本描述</span>
      <span>上传时间</span>
      <span>大小</span>
      <span>操作</span>
    </div>

    <div class="item-group" v-for="(item,index) in appList" :key="index">
      <div>
        <div>
          <img :src="item.icon" alt="" style="width: 50px;height: 50px">
          <span>{{ item.versionName }}</span>
        </div>
        <div class="qrcode">
          <span>{{ item.id }}</span>
          <QrcodeOutlined style="font-size: 25px;padding-left: 10px" @click="goDownload(item.id)"/>
        </div>
        <span>审核通过</span>
        <span>{{ getPlatform(item.platform) }}</span>
        <div class="item-desc">
          <span v-if="!showEditDesc || currentEditId !== item.id">{{ item.desc }}</span>
          <a-input v-if="showEditDesc && currentEditId === item.id"
                   v-model:value="eDesc"
                   :placeholder="item.desc"/>
        </div>
        <span>{{ getDate(item.uploadTime) }}</span>
        <span>{{ getSize(item.size) }}</span>
        <div class="operation">
          <DeleteFilled/>
          <EditFilled v-if="!showEditDesc || currentEditId !== item.id" @click="editDesc(item)"/>
          <SaveFilled v-if="showEditDesc && currentEditId === item.id" @click="saveDesc"/>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="pagination">
      <a-pagination v-model:current="current" :total="total" show-less-items @change="onPaginationChange"/>
    </div>
  </div>

</template>

<script>
import {reactive, toRefs} from "vue";
import {getDate, getPlatform} from "@/utils/tools";
import {getSize} from "@/utils/fileUtils";
import {DeleteFilled, EditFilled, QrcodeOutlined, SaveFilled} from "@ant-design/icons-vue";
import {openNewTabView} from "@/utils/bridges";
import {queryAppListByAppId, updateAppDescById} from "@/utils/service";
import {message} from "ant-design-vue";

export default {
  name: "index",
  components: {
    QrcodeOutlined,
    EditFilled,
    DeleteFilled,
    SaveFilled
  },
  props: {
    appId: {
      type: String,
      default: ''
    },
    platform: {
      type: Number,
      default: 0 //0全部，1android，2iOS
    },
  },
  setup(props) {
    const state = reactive({
      eDesc: '',
      showEditDesc: false,
      currentEditId: '',
      current: 1,
      appList: [],//全部列表
      currentPage: 1,
      pageSize: 10,
      total: 0,
    })
    const goDownload = (appId) => {
      openNewTabView(`/download/${appId}`)
    }
    const editDesc = (item) => {
      state.showEditDesc = true
      state.currentEditId = item.id
      state.eDesc = item.desc
    }
    const saveDesc = async () => {
      state.showEditDesc = false
      //请求接口
      let result = await updateAppDescById({id: state.currentEditId, desc: state.eDesc})
      if (1 === result.flag) {
        message.info(result.info)
        //修改数据
        props.appList.forEach(item => {
          if (item.id === state.currentEditId) {
            item.desc = state.eDesc
          }
        })
      }
    }

    const queryAppList = async () => {
      const appId = props.appId
      console.log("------>appId---->", appId, props.platform)
      let result = await queryAppListByAppId({
        appId,
        platform: props.platform,
        page: state.currentPage,
        pageSize: state.pageSize
      })

      state.appList = result.data
      state.total = result.total
      console.log("----queryAppListByAppId--->>>>>", result)
    }

    /***
     * 页码改变的回调，参数是改变后的页码及每页条数
     * @param page
     * @param pageSize
     */
    const onPaginationChange = (page, pageSize) => {
      console.log("----->>>>", page, pageSize)
      state.currentPage = page
      queryAppList()
    }

    return ({
      ...toRefs(state),
      getPlatform,
      getSize,
      getDate,
      goDownload,
      editDesc,
      saveDesc,
      onPaginationChange,
      queryAppList
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>