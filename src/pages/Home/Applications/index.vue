<template>
  <a-layout-content class="content-group">
    <div class="content-title">
      <span>{{ title }}</span>
      <div v-if="!showForm" class="add-container" @click="changeShowForm">
        <PlusCircleOutlined/>
        <span>创建应用</span>
      </div>
    </div>
    <!--    创建应用编辑框-->
    <a-form
        v-if="showForm"
        class="edit-form"
        name="basic"
        ref="formRef"
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :rules="rules"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          has-feedback
          label="应用名称:"
          name="appName">
        <a-input v-model:value="formState.appName"/>
      </a-form-item>

      <a-form-item
          label="应用简介:"
          name="appDesc"
          :rules="[{ required: true, message: '请输入应用简介' }]">
        <a-input v-model:value="formState.appDesc"/>
      </a-form-item>

      <a-form-item
          label="package name:"
          name="packageName"
          validateTrigger="blur"
          :rules="[{ required: true, message: '请输入android包名' }]">
        <a-textarea v-model:value="formState.packageName"/>
      </a-form-item>

      <a-form-item
          label="bund ID:"
          name="bundId"
          validateTrigger="blur"
          :rules="[{ required: true, message: '请输入IOS bund ID' }]">
        <a-input v-model:value="formState.bundId"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">确认</a-button>
        <a-button style="margin-left: 10px" @click="cancelForm">取消</a-button>
      </a-form-item>
    </a-form>
    <!--    应用列表-->
    <div class="content-grid">
      <div v-for="(item,index) in applicationList" :key="index" class="grid-item" @click="goApplicationDetail">
        <img src="@/assets/user.png" alt="">
        <div>
          <h3>{{ item.appName }}</h3>
          <span class="english">包名：{{ item.packageName }}</span>
          <span class="english">bund ID：{{ item.bundId }}</span>
          <span>简介：{{ item.appDesc }}</span>
        </div>
      </div>
    </div>
  </a-layout-content>
</template>


<script>
import {onMounted, reactive, ref, toRefs} from "vue";
import {message} from "ant-design-vue";
import {useStore} from "vuex";
import {PlusCircleOutlined} from "@ant-design/icons-vue";
import {openNewView} from "@/utils/bridges";

export default {
  name: "index",
  components: {
    PlusCircleOutlined
  },
  setup() {
    const store = useStore()
    const formRef = ref()
    const state = reactive({
      applicationList: [],
      showForm: false,
      title: '我的应用',
    })

    const formState = reactive({
      appName: '',
      appDesc: '',
      packageName: '',
      bundId: '',
    });

    let validateAppName = async (_rule, value) => {
      if (value === '') {
        return Promise.reject("请输入应用名称")
      } else {
        if (value.length < 2) {
          return Promise.reject("输入应用名称太短")
        } else if (value.length > 10) {
          return Promise.reject("输入应用名称太长")
        } else {
          return Promise.resolve()
        }
      }
    }
    const rules = {
      appName: [{
        required: true,
        trigger: 'blur',
        validator: validateAppName
      }]
    }

    const changeShowForm = () => {
      state.showForm = !state.showForm
    }

    const cancelForm = () => {
      state.showForm = false
      formRef.value.resetFields()
    }

    const onFinishFailed = (errors) => {
      console.log("errors--------->", errors)
      //表单验证不通过
    }

    const onFinish = values => {
      console.log('Success:', values);
      //全部验证通过
      //后期改为存储服务器数据库
      store.dispatch("appInfo/saveAppInfo", values).then(() => {
        cancelForm()
      }).catch(error => {
        message.warn("提交失败!", error)
      })
    };

    //跳转到详情
    const goApplicationDetail = () => {
      openNewView('/applicatiton-info')
    }

    onMounted(() => {
      state.applicationList = store.state.appInfo.appInfos
    })

    return ({
      ...toRefs(state),
      formRef,
      formState,
      rules,
      changeShowForm,
      cancelForm,
      onFinish,
      onFinishFailed,
      goApplicationDetail,
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>