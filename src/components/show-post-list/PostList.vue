<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-25 19:04:23
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 16:59:53
 * @FilePath: \campus-grocery\src\components\show-post-list\PostList.vue
 * @Description: 帖子列表
-->
<template>
  <div
    class="post-list"
    v-loading="loading"
  >
    <p
      class="search-tips"
      v-if="searchData && !userPostList"
    >
      以下是 <strong class="search-data">{{ searchData }}</strong> 的搜索结果（共
      <strong class="post-num">{{ searchPostListNum }}</strong> 条内容）：
    </p>

    <p
      v-if="userPostList"
      class="user-post-tips"
    >
      我的发布（共
      <strong class="post-num">{{ userPostListNum }}</strong> 条内容）：
    </p>

    <BasePostPreview
      v-for="postItem in postList"
      :key="postItem.id"
      :postData="postItem"
    />

    <el-pagination
      :page-size="pageSize"
      :total="currentListNum"
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
      searchData: '',
      searchPostListNum: 0,
      userPostList: false,
      userPostListNum: 0,
    }
  },

  computed: {
    currentListNum() {
      if (this.userPostList) {
        return this.userPostListNum
      } else if (this.searchData) {
        return this.searchPostListNum
      }
      return this.postListNum
    },
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
        searchData: this.searchData,
        userPostList: this.userPostList,
      })

      resHandle(res, {
        successHandle: () => {
          const { postList, searchPostListNum, userPostListNum } = res.data
          ;[this.postList, this.searchPostListNum, this.userPostListNum] = [
            postList,
            searchPostListNum,
            userPostListNum,
          ]
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

    const { searchData, userPostList } = this.$route.query
    if (searchData) {
      this.searchData = searchData
    }

    if (userPostList === '1') {
      this.userPostList = userPostList
    }

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

  .search-tips,
  .user-post-tips {
    color: #909399;
    margin-bottom: 10px;

    .post-num {
      color: #e6a23c;
    }
  }

  .search-tips {
    .search-data {
      color: #f56c6c;
    }
  }

  .el-pagination {
    position: fixed;
    bottom: 30px;
  }
}
</style>
