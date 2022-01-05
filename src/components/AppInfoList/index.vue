<template>
  <div>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "index",
  props: {
    appInfo: {
      type: Object,
      default: null
    }
  },
  setup() {
    const state = reactive({})

    return ({
      ...toRefs(state)
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>