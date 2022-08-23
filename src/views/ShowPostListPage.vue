<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-23 20:18:46
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-23 20:27:27
 * @FilePath: \campus-grocery\src\views\ShowPostListPage.vue
 * @Description: 帖子列表展示界面
-->
<template>
  <el-main>
    <el-tabs v-model="postType">
      <el-tab-pane
        name="transaction"
        label="二手交易"
      >
      </el-tab-pane>

      <el-tab-pane
        name="campus"
        label="趣闻轶事"
      >
      </el-tab-pane>

      <el-tab-pane
        name="lost"
        label="失物招领"
      >
      </el-tab-pane>

      <el-tab-pane
        name="advert"
        label="广告推广"
      >
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
export default {
  name: 'ShowPostListPage',

  data() {
    return {
      postType: 'transaction',
    }
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-tabs {
    width: 1100px;
    height: 100%;
    min-width: 1100px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
  }
}
</style>
