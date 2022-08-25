<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-23 20:18:46
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 22:34:12
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
        <PostList
          :postType="postType"
          v-if="postType === 'transaction'"
        />
      </el-tab-pane>

      <el-tab-pane
        name="campus"
        label="趣闻轶事"
      >
        <PostList
          :postType="postType"
          v-if="postType === 'campus'"
        />
      </el-tab-pane>

      <el-tab-pane
        name="lost"
        label="失物招领"
      >
        <PostList
          :postType="postType"
          v-if="postType === 'lost'"
        />
      </el-tab-pane>

      <el-tab-pane
        name="advert"
        label="广告推广"
      >
        <PostList
          :postType="postType"
          v-if="postType === 'advert'"
        />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import PostList from '@/components/show-post-list/PostList.vue'

export default {
  name: 'ShowPostListPage',

  components: { PostList },

  data() {
    return {
      postType: 'transaction',
    }
  },

  created() {
    const { postType } = this.$route.query

    if (postType) {
      this.postType = postType
    }
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
    height: 100%;
    min-width: 1100px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
  }
}
</style>
