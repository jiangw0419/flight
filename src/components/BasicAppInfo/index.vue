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
        <a-textarea v-model:value="formState.packageName" :disabled="!isCanEdit"/>
      </a-form-item>

      <a-form-item
          label="bund ID:"
          name="bundId"
          validateTrigger="blur"
          :rules="[{ required: true, message: '请输入IOS bund ID' }]">
        <a-input v-model:value="formState.bundId" :disabled="!isCanEdit"/>
      </a-form-item>

      <a-form-item v-if="isShowConfirmAndCancel" :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">确认</a-button>
        <a-button style="margin-left: 10px" @click="cancelForm">取消</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import {message} from "ant-design-vue";
import {useStore} from "vuex";
import {EditTwoTone} from "@ant-design/icons-vue";
//基本信息编辑框
export default {
  name: "index",
  components: {
    EditTwoTone
  },
  props: {
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
    }

  },
  setup(props) {
    const store = useStore()
    const formRef = ref()
    const state = reactive({
      isShowConfirmAndCancel: !props.isCancelHideSubmit,
      isCanEdit: props.isCanModify
    })
    const formState = reactive({
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
    }

    const startModify = () => {
      state.isCanEdit = !state.isCanEdit
      state.isShowConfirmAndCancel = true
    }

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