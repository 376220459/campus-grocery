<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 16:10:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 18:42:16
 * @FilePath: \campus-grocery\src\components\user-interact\UserCommentList.vue
 * @Description: 用户评论列表组件
-->
<template>
  <div
    class="user-comment-list-container"
    v-loading="loading"
  >
    <p class="title">
      您评论了 <strong>{{ userCommentNum }}</strong> 个帖子
    </p>

    <el-divider></el-divider>

    <div class="record-list">
      <div
        class="record-container"
        v-for="record in userCommentList"
        :key="record.id"
      >
        <div class="record-main">
          <p class="record-text">您评论了帖子</p>

          <p
            class="post-title"
            @click="toPost(record)"
          >
            {{ record.postTitle }}
          </p>

          <el-divider content-position="left"><i class="el-icon-chat-line-square" /></el-divider>

          <p class="comment-content">{{ record.commentContent }}</p>
        </div>

        <p class="record-time">{{ record.commentTime }}</p>
      </div>
    </div>

    <el-pagination
      :page-size="pageSize"
      :total="userCommentNum"
      layout="prev, pager, next"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserCommentNum, getUserCommentList } from '@/apis/userInteract'
import resHandle from '@/utils/resHandle'

export default {
  name: 'UserCommentList',

  data() {
    return {
      loading: false,

      pagerCount: 7,
      pageSize: 5,
      currentPage: 1,
      userCommentNum: 0,
      userCommentList: [],
    }
  },

  methods: {
    // 前往某一页
    async toPage() {
      this.loading = true

      await this.getUserCommentList()
    },

    // 获取用户评论帖子个数
    async getUserCommentNum() {
      const res = await getUserCommentNum()
      resHandle(res, {
        successHandle: () => {
          this.userCommentNum = res.data.userCommentNum
        },
      })
    },

    // 获取用户评论列表
    async getUserCommentList() {
      const res = await getUserCommentList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })

      resHandle(res, {
        successHandle: () => {
          this.userCommentList = res.data.userCommentList
        },
        finallyHandle: () => {
          this.loading = false
        },
      })
    },

    // 前往帖子界面
    toPost(record) {
      const { postId: id, postType } = record
      this.$router.push(`/showPost?postType=${postType}&id=${id}`)
    },
  },

  async created() {
    this.loading = true

    await this.getUserCommentNum()
    await this.getUserCommentList()
  },
}
</script>

<style scoped lang="scss">
.user-comment-list-container {
  position: relative;
  height: 100%;
  padding: 0 20px 100px 20px;
  display: flex;
  flex-direction: column;

  .title {
    text-align: left;

    strong {
      color: #e6a23c;
    }
  }

  .record-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;

    .record-container {
      position: relative;
      width: 100%;
      display: flex;
      padding-bottom: 30px;
      margin: 10px 0 25px 0;

      &:last-of-type {
        margin-bottom: 0;
      }

      .record-main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .record-text {
          text-align: left;
          color: #909399;
          margin-bottom: 15px;
        }

        .post-title {
          color: #606266;
          font-weight: bold;
          text-align: left;
          cursor: pointer;

          &:hover {
            color: #409eff;
          }
        }

        .comment-content {
          text-align: left;
          white-space: pre-wrap;
        }
      }

      .record-time {
        min-width: 85px;
        display: flex;
        align-items: flex-start;
        color: #909399;
        margin-right: 10px;
      }
    }
  }

  .el-pagination {
    position: absolute;
    bottom: 0;
    align-self: center;
  }
}
</style>
