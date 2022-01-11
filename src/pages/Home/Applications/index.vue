<template>

  <div class="content-title">
    <span>{{ title }}</span>
    <div v-if="!showForm" class="add-container" @click="changeShowForm">
      <PlusCircleOutlined/>
      <span>创建应用</span>
    </div>
  </div>
  <!--    创建应用编辑框-->
  <BasicAppInfo v-if="showForm" :is-cancel-hide-submit="false" :is-reset-data="true"
                :cancel-callback="changeShowForm" :successCallBack="successCallBack"></BasicAppInfo>
  <!--    应用列表-->
  <div class="content-grid">
    <div v-for="(item,index) in applicationList" :key="index" class="grid-item" @click="goApplicationDetail(item)">
      <img src="@/assets/user.png" alt="">
      <div>
        <h3>{{ item.appName }}</h3>
        <span class="english">包名：{{ item.packageName }}</span>
        <span class="english">bund ID：{{ item.bundId }}</span>
        <span>简介：{{ item.appDesc }}</span>
      </div>
    </div>
  </div>
</template>


<script>
import {onMounted, reactive, toRefs} from "vue";
import {PlusCircleOutlined} from "@ant-design/icons-vue";
import {openNewView} from "@/utils/bridges";
import BasicAppInfo from "@/components/BasicAppInfo";
import {queryAllApps} from "@/utils/service";

export default {
  name: "index",
  components: {
    PlusCircleOutlined,
    BasicAppInfo,
  },
  setup() {
    const state = reactive({
      applicationList: [],
      showForm: false,
      title: '我的应用',
    })

    const cancelForm = () => {
      state.showForm = false
    }

    //跳转到详情
    const goApplicationDetail = (appInfo) => {
      openNewView(`/applicatiton-info/${appInfo.id}`)
    }
    const changeShowForm = () => {
      state.showForm = !state.showForm
    }
    const queryAllApplications = async () => {
      let data = await queryAllApps()
      state.applicationList = data
    }

    const successCallBack = () => {
      queryAllApplications()
    }

    onMounted(() => {
      queryAllApplications()
    })

    return ({
      ...toRefs(state),
      cancelForm,
      goApplicationDetail,
      changeShowForm,
      successCallBack
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>