<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 16:00:21
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
  user-select: none;
}

// ---------------------------------分割线--------------------------------------------
// 全局更改element-ui样式

//设置全局的照片墙照片缩放格式
.el-upload-list__item-thumbnail {
  object-fit: scale-down;
}

//设置全局表单每行的盒模型为flex
.el-form-item__content {
  display: flex;
  align-items: center;
}

// ---------------------------------分割线--------------------------------------------

.icon,
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
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
    background-color: #f0f6ff;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
}
</style>
