<template>
  <a-layout class="home-group">
    <a-layout-sider class="left" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/user.png" alt="">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined/>
          <span>{{ title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{marginLeft:`${layoutLeft}px`}">
      <!--      顶部区域-->
      <a-layout-header class="header-group" style="background: #fff; padding: 0 10px">
        <div>
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="changeColloapse"/>
          <menu-fold-outlined v-else class="trigger" @click="changeColloapse"/>
        </div>
        <span class="logout">退出</span>
      </a-layout-header>
      <!--      内容区域-->
      <a-layout-content class="content-group">
        <div class="content-title">
          <span>{{ title }}</span>
          <div class="add-container" @click="changeShowForm">
            <PlusCircleOutlined/>
            <span>创建应用</span>
          </div>
        </div>
        <!--创建应用编辑框-->
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username"/>
          </a-form-item>
        </a-form>

        <!--应用列表-->
        <div class="content-grid">
          <div v-for="(item,index) in applicationList" :key="index" class="grid-item">
          </div>
        </div>

      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {reactive, toRefs} from "vue";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleOutlined
} from '@ant-design/icons-vue';

export default {
  name: "index",
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PlusCircleOutlined
  },

  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      applicationList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11],
      layoutLeft: 200,
      title: '我的应用',
      showForm: true,
    })

    const formState = reactive({
      username: '',
    });
    const onFinish = values => {
      console.log('Success:', values);
    };


    const changeColloapse = () => {
      state.collapsed = !state.collapsed
      state.layoutLeft = state.collapsed ? 80 : 200
    }
    const changeShowForm = () => {
      state.showForm = !state.showForm
    }

    const cancelForm = () => {
      state.showForm = false
    }

    return ({
      ...toRefs(state),
      changeColloapse,
      changeShowForm,
      cancelForm,
      formState,
      onFinish
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>