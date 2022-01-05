<template>
  <div class="user-list">
    <div class="list-title">
      <span>姓名</span>
      <span>手机号</span>
      <span>权限</span>
    </div>
    <div v-for="(user,index) in userList" :key="index" >
      <div class="item">
        <span>{{ user.userAccount }}</span>
        <span>{{ user.userAccount }}</span>
        <span>管理员</span>
      </div>
      <div class="line"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped lang="less">
@import "./index";
</style>