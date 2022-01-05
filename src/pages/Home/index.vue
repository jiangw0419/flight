<template>
  <a-layout class="home-group">
    <a-layout-sider class="left" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/user.png" alt="">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item :key="index" v-for="(item,index) in menuItems" @click="clickItem(index)">
          <user-outlined/>
          <span>{{ item }}</span>
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
      <a-layout-content class="content-group" style="overflow: initial">
        <router-view></router-view>
      </a-layout-content>
      <!--  底部区域    -->
      <a-layout-footer style="text-align: center; font-weight: bold">
        Test Flight ©2022 Created by 联储金工大前端组
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import {reactive, toRefs} from "vue";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";

export default {
  name: "index",
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  setup() {
    const router = useRouter()
    const state = reactive({
      collapsed: false,
      selectedKeys: [0],
      layoutLeft: 200,//default 展开200  收缩80
      menuItems: ['我的应用', '其他'],
    })

    const changeColloapse = () => {
      state.collapsed = !state.collapsed
      state.layoutLeft = state.collapsed ? 80 : 200
    }

    //监听侧栏菜单选项卡
    const clickItem = (index) => {
      if (0 === index) {
        router.push("/")
      } else {
        router.push("/other")
      }
    }

    return ({
      ...toRefs(state),
      changeColloapse,
      clickItem,
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>