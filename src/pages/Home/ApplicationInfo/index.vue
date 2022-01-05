<template>
  <div class="app-info">
    <span>应用信息</span>
    <a-tabs v-model:activeKey="activeKey">
      <!--      包管理-->
      <a-tab-pane key="1" tab="包管理">
        <div>
          <a-upload-dragger
              v-model:fileList="fileList"
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">点击或者拖拽apk到这里上传</p>
          </a-upload-dragger>
          <a-tabs v-model:activeKey="activeChildKey" type="card">
            <a-tab-pane key="1" tab="全部">
              <AppInfoList></AppInfoList>
            </a-tab-pane>
            <a-tab-pane key="2" tab="android">
              <AppInfoList></AppInfoList>
            </a-tab-pane>
            <a-tab-pane key="3" tab="iOS">
              <AppInfoList></AppInfoList>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-tab-pane>
      <!--  基本信息    -->
      <a-tab-pane key="2" tab="基本信息" force-render>
        <BasicAppInfo :is-show-pencil="true" :is-reset-data="false" :is-cancel-hide-submit="true"
                      :is-can-modify="false"></BasicAppInfo>
      </a-tab-pane>

      <!--      成员管理-->
      <a-tab-pane key="3" tab="成员管理">

      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {InboxOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import AppInfoList from "@/components/AppInfoList";
import BasicAppInfo from "@/components/BasicAppInfo";

export default {
  name: "index",
  components: {
    InboxOutlined,
    AppInfoList,
    BasicAppInfo,
  },
  setup() {
    const state = reactive({
      activeKey: '1',
      activeChildKey: '1',
      fileList: []
    })

    //上传
    const handleChange = info => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    return ({
      ...toRefs(state),
      handleChange
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>