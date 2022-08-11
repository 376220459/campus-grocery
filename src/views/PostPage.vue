<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 19:41:00
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 23:03:09
 * @FilePath: \campus-grocery\src\views\PostPage.vue
 * @Description: 发布帖子界面
-->
<template>
  <el-main>
    <el-tabs
      v-model="postType"
      @tab-click="changePostType"
    >
      <el-tab-pane name="transaction">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          二手交易
        </span>

        <TransactionPostForm />
      </el-tab-pane>

      <el-tab-pane name="campus">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          校园趣闻轶事
        </span>

        发布校园趣闻轶事
      </el-tab-pane>

      <el-tab-pane name="lost">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          失物招领
        </span>

        发布失物招领
      </el-tab-pane>

      <el-tab-pane name="advert">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          广告
        </span>

        发布广告
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import TransactionPostForm from '@/components/post/TransactionPostForm.vue'

export default {
  name: 'PostPage',

  components: { TransactionPostForm },

  data() {
    return {
      postType: 'transaction',
    }
  },

  methods: {
    changePostType() {
      alert(`切换至${this.postType}`)
    },
  },
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-tabs {
    width: 1100px;
    min-width: 1100px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
  }
}
</style>
