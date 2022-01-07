<template>
  <div class="login-group">
    <img src="@/assets/logo.png" alt="">
    <input type="text" placeholder="请输入账号" v-model="userAccount">
    <input type="password" placeholder="请输入密码" v-model="userPwd">
    <a-button class="btn" type="primary" @click="goHome()">登录</a-button>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {message} from "ant-design-vue";
import {useStore} from "vuex";
import {openNewView} from "@/utils/bridges";
import {queryUserInfo} from "@/utils/service";

export default {
  name: "index",
  setup() {
    const store = useStore()
    const state = reactive({
      userAccount: '',
      userPwd: '',
    })
    const goHome = async () => {
      const result = await queryUserInfo({account: state.userAccount, password: state.userPwd})
      console.log("------>>>>result", result)
      if (result.length > 0) {
        await store.dispatch("user/saveUserInfo", {
          userAccount: state.userAccount,
        },)
        openNewView("/")
      } else {
        message.error("请先联系系统管理员进行注册")
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