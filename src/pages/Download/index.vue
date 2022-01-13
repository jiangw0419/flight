<template>
  <div class="download-group">
    <div class="qrcode-group">
      <div class="icon">
        <img :src="appDetail.icon" alt="">
      </div>
      <div class="rectangle"/>
      <div class="download-qrcode">
        <div id="qrcode"></div>
      </div>
    </div>

    <div class="content-group">
      <span>内测版本</span>
      <div class="version-desc">
        <AndroidFilled style="font-size: 43px"/>
        <span>{{ appDetail.appName }}</span>
        <span>v{{ appDetail.versionName }}</span>
      </div>
      <p>扫描二维码下载</p>
      <p>版本描述：{{ appDetail.desc }}</p>
      <p>发布时间：{{ getDate(appDetail.uploadTime) }}</p>
      <a-button class="download-btn" :href="`${baseUrl}${appDetail.downloadPath}`"
                type="primary"
                shape="round"
                size="large">
        <template #icon>
          <DownloadOutlined/>
          Download
        </template>
      </a-button>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {queryAppDetailById} from "@/utils/service";
import {AndroidFilled, DownloadOutlined} from "@ant-design/icons-vue";
import {getDate} from "@/utils/tools";
import QRCode from 'qrcodejs2'


export default {
  name: "index",
  components: {
    AndroidFilled,
    DownloadOutlined
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      appDetail: {},
      baseUrl: 'http://localhost:3000/'
    })
    const queryAppDetail = async () => {
      let id = route.params.id
      let result = await queryAppDetailById({id})
      state.appDetail = result || {}
      makeQrcode(`${state.baseUrl}${state.appDetail.downloadPath}`)
    }

    const makeQrcode = (qurl) => {
      console.log("------>>qurl=", qurl)
      new QRCode("qrcode",
          {
            text: qurl,
            width: 80,
            height: 80
          })

    }

    onMounted(() => {
      queryAppDetail()
    })
    return ({
      ...toRefs(state),
      getDate,
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>