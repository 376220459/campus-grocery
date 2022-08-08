<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 15:49:17
 * @FilePath: \campus-grocery\src\App.vue
 * @Description: App.vue文件
-->
<template>
  <div
    id="app"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-container>
      <header-nav />
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderNav from './components/nav/HeaderNav.vue'
export default {
  components: { HeaderNav },
  computed: {
    ...mapState(['loading', 'loadingText']),
  },
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .el-container {
    background-color: #e4e7ed;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
}
</style>
