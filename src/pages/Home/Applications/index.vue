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
                :cancel-callback="changeShowForm"></BasicAppInfo>
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
</template>


<script>
import {onMounted, reactive, toRefs} from "vue";
import {useStore} from "vuex";
import {PlusCircleOutlined} from "@ant-design/icons-vue";
import {openNewView} from "@/utils/bridges";
import BasicAppInfo from "@/components/BasicAppInfo";

export default {
  name: "index",
  components: {
    PlusCircleOutlined,
    BasicAppInfo,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      applicationList: [],
      showForm: false,
      title: '我的应用',
    })

    const cancelForm = () => {
      state.showForm = false
    }

    //跳转到详情
    const goApplicationDetail = () => {
      openNewView('/applicatiton-info')
    }
    const changeShowForm = () => {
      state.showForm = !state.showForm
    }

    onMounted(() => {
      state.applicationList = store.state.appInfo.appInfos
    })


    return ({
      ...toRefs(state),
      cancelForm,
      goApplicationDetail,
      changeShowForm,
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>