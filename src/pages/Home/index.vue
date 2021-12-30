<template>
  <div class="home-group">
    <img src="@/assets/logo.png" alt="">
    <input type="text" placeholder="请输入账号" v-model="userAccount">
    <input type="password" placeholder="请输入密码" v-model="userPwd">
    <!--    <van-button class="btn" type="primary" @click="goHome()">登录</van-button>-->
    <a-button class="btn" type="primary" @click="goHome()">Primary Button</a-button>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {message} from "ant-design-vue";

export default {
  name: "index",
  setup() {
    const state = reactive({
      userAccount: '',
      userPwd: '',
    })
    const goHome = () => {
      if ("admin" === state.userAccount && "123456" === state.userPwd) {
        console.log("---->登录成功")
      } else {
        message.warn("账号密码错误")
      }
    }
    return ({
      ...toRefs(state),
      goHome
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>