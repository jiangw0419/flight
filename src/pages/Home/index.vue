<template>
  <div class="home-group">
    <div>我是home</div>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "index",
  setup() {
    const state = reactive({})

    return ({
      ...toRefs(state),
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>