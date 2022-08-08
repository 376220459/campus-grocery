<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-07 22:12:15
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 18:44:01
 * @FilePath: \campus-grocery\src\views\HomePage.vue
 * @Description: 校园杂货铺首页
-->
<template>
  <el-main>
    <div class="posts-show">
      <div class="show-bar">失物招领</div>
      <div class="show-bar">广告栏</div>
      <div class="show-bar">趣闻轶事</div>
    </div>
    <div>二手交易</div>
  </el-main>
</template>

<script>
export default {
  name: 'HomePage',

  data() {
    return {}
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.el-main {
  .posts-show {
    height: 350px;
    display: flex;
    justify-content: center;
    .show-bar {
      min-width: 400px;
      height: 300px;
      border: 1px solid black;
      margin: 0 20px;
    }
  }
}
</style>
