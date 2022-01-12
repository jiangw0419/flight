<template>
  <div class="app-info-group">
    <div class="item-head">
      <div>
        <span>版本号</span>
      </div>
      <span>id</span>
      <span>状态</span>
      <span>平台</span>
      <span>版本描述</span>
      <span>上传时间</span>
      <span>大小</span>
      <span>操作</span>
    </div>

    <div class="item-group" v-for="(item,index) in appList" :key="index">
      <div>
        <div>
          <img :src="item.icon" alt="" style="width: 50px;height: 50px">
          <span>{{ item.versionName }}</span>
        </div>
        <span>{{ item.id }}</span>
        <span>审核通过</span>
        <span>{{ getPlatform(item.platform) }}</span>
        <div class="item-desc">
          <span>{{ item.desc }}</span>

        </div>
        <span>{{ getDate(item.uploadTime) }}</span>
        <span>{{ getSize(item.size) }}</span>
        <div></div>
      </div>
      <div class="line"></div>
    </div>
  </div>

</template>

<script>
import {reactive, toRefs} from "vue";
import {getDate, getPlatform} from "@/utils/tools";
import {getSize} from "@/utils/fileUtils";

export default {
  name: "index",
  props: {
    appList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
    const state = reactive({})
    return ({
      ...toRefs(state),
      getPlatform,
      getSize,
      getDate,
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>