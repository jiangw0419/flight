<template>
  <div class="login-group">
    <img src="@/assets/logo.png" alt="">
    <input type="text" placeholder="请输入账号" v-model="userAccount">
    <input type="password" placeholder="请输入密码" v-model="userPwd">
    <!--    <van-button class="btn" type="primary" @click="goHome()">登录</van-button>-->
    <a-button class="btn" type="primary" @click="goHome()">登录</a-button>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {message} from "ant-design-vue";
import {useStore} from "vuex";
import {openNewView} from "@/utils/bridges";

export default {
  name: "index",
  setup() {
    const store = useStore()
    const state = reactive({
      userAccount: '',
      userPwd: '',
    })
    const goHome = () => {
      if ("admin" === state.userAccount && "123456" === state.userPwd) {
        //模拟登录成功，存储数据到session中
        store.dispatch("user/saveUserInfo", {
          userAccount: state.userAccount,
          userPassword: state.userPwd
        },)
        openNewView("/")
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