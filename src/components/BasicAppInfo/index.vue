<template>
  <div class="basic-group">
    <div class="edit-item" v-if="isShowPencil" @click="startModify">
      <EditTwoTone style="font-size: 32px"/>
    </div>
    <a-form
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
        <a-input v-model:value="formState.appName" :disabled="!isCanEdit"/>
      </a-form-item>

      <a-form-item
          label="应用简介:"
          name="appDesc"
          :rules="[{ required: true, message: '请输入应用简介' }]">
        <a-input v-model:value="formState.appDesc" :disabled="!isCanEdit"/>
      </a-form-item>

      <a-form-item
          label="package name:"
          name="packageName"
          validateTrigger="blur"
          :rules="[{ required: true, message: '请输入android包名' }]">
        <a-textarea v-model:value="formState.packageName" :disabled="!isCanModify"/>
      </a-form-item>

      <a-form-item
          label="bund ID:"
          name="bundId"
          validateTrigger="blur"
          :rules="[{ required: true, message: '请输入IOS bund ID' }]">
        <a-input v-model:value="formState.bundId" :disabled="!isCanModify"/>
      </a-form-item>

      <a-form-item v-if="isShowConfirmAndCancel" :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">确认</a-button>
        <a-button style="margin-left: 10px" @click="cancelForm">取消</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import {reactive, ref, toRefs, watch} from "vue";
import {EditTwoTone} from "@ant-design/icons-vue";
import {addApp, updateAppById} from "@/utils/service";
import {message} from "ant-design-vue";
//基本信息编辑框
export default {
  name: "index",
  components: {
    EditTwoTone
  },
  props: {
    appInfo: {
      type: Object,
      default: null
    },
    isShowPencil: {
      type: Boolean,
      default: false
    },
    isCanModify: {
      type: Boolean,
      default: true
    },
    isResetData: {
      type: Boolean,
      default: false
    },
    isCancelHideSubmit: {
      type: Boolean,
      default: true
    },
    cancelCallback: {
      type: Function,
      default: null
    },
    successCallBack: {}
  },
  setup(props) {
    const formRef = ref()
    const state = reactive({
      isShowConfirmAndCancel: !props.isCancelHideSubmit,
      isCanEdit: props.isCanModify,
    })
    const formState = reactive({
      appId: '',//暂时用app名称作为appId
      appName: '',
      appDesc: '',
      packageName: '',
      bundId: '',
    })


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
      }],
      // ...
    }


    const onFinishFailed = (errors) => {
      console.log("errors--------->", errors)
      //表单验证不通过
    }

    const onFinish = async values => {
      //判断是更新还是新增
      let result = null
      if (props.isShowPencil) {//更新
        result = await updateAppById(values)
      } else {
        result = await addApp(values)
      }
      console.log("----data>>>", result)
      if (result && 1 === result.flag) {
        // 添加成功
        cancelForm()
        if (props.successCallBack) {
          props.successCallBack()
        }
      } else {
        message.warn(result.error_info)
      }
    };


    const cancelForm = () => {
      if (props.isResetData) {
        formRef.value.resetFields()
      }
      if (props.isCancelHideSubmit) {
        state.isShowConfirmAndCancel = false
      }
      if (props.cancelCallback) {
        props.cancelCallback()
      }
      state.isCanEdit = false
    }

    const startModify = () => {
      state.isCanEdit = !state.isCanEdit
      state.isShowConfirmAndCancel = !state.isShowConfirmAndCancel
    }

    watch(() => props.appInfo, newValue => {
      if (newValue) {
        formState.appId = newValue.appId
        formState.appName = newValue.appName
        formState.appDesc = newValue.appDesc
        formState.packageName = newValue.packageName
        formState.bundId = newValue.bundId
      }
    }, {immediate: true})


    return ({
      ...toRefs(state),
      formState,
      rules,
      formRef,
      onFinishFailed,
      onFinish,
      cancelForm,
      startModify
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>