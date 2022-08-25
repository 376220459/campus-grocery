<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-25 19:04:23
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 22:36:01
 * @FilePath: \campus-grocery\src\components\show-post-list\PostList.vue
 * @Description: 帖子列表
-->
<template>
  <div
    class="post-list"
    v-loading="loading"
  >
    <p style="color: red; font-size: 80px">以下是“SearchData”的搜索结果</p>

    <BasePostPreview
      v-for="postItem in postList"
      :key="postItem.id"
      :postData="postItem"
    />

    <el-pagination
      :page-size="pageSize"
      :total="postListNum"
      layout="prev, pager, next"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import BasePostPreview from '@/components/base/BasePostPreview.vue'
import resHandle from '@/utils/resHandle'
import { getPostList2, getPostListNum } from '@/apis/handlePostList'

export default {
  name: 'PostList',

  props: {
    postType: {
      type: String,
      required: true,
    },
  },

  components: { BasePostPreview },

  data() {
    return {
      loading: false,
      pagerCount: 7,
      pageSize: 4,
      postListNum: 0,
      currentPage: 1,
      postList: [],
    }
  },

  methods: {
    // 获取帖子列表总数
    async getPostListNum() {
      const res = await getPostListNum({ postType: this.postType })
      resHandle(res, {
        successHandle: () => {
          const postListNum = res.data.postListNum
          this.postListNum = postListNum
        },
      })
    },

    // 获取帖子列表
    async getPostList2() {
      const res = await getPostList2({
        postType: this.postType,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })

      resHandle(res, {
        successHandle: () => {
          const postList = res.data.postList
          this.postList = postList
        },
        finallyHandle: () => {
          this.loading = false
        },
      })
    },

    // 前往某一页
    async toPage() {
      this.loading = true
      await this.getPostList2()
    },
  },

  async created() {
    this.loading = true
    await this.getPostListNum()
    await this.getPostList2()
  },
}
</script>

<style scoped lang="scss">
.post-list {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  .el-pagination {
    position: fixed;
    bottom: 30px;
  }
}
</style>
