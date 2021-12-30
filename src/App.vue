<template>
  <router-view v-slot="{ Component }">
    <!--    <keep-alive :include="keepAlivePage">-->
    <component :is="Component"/>
    <!--    </keep-alive>-->
  </router-view>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
@import "./css/index.css";

.app-global {
  display: flex;
  flex-direction: column;
}

body {
  position: relative;
  overflow: hidden;
}

#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*解决ios上按钮自动添加的按压效果*/
  -webkit-tap-highlight-color: transparent;
  /*text-align: center;*/
  color: #2c3e50;
  overflow: scroll;
  /*height: 100vh;*/
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  font-family: SourceHanSansSC;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
