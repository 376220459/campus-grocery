<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 16:10:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-23 19:52:02
 * @FilePath: \campus-grocery\src\components\message\CommentMessageList.vue
 * @Description: 评论消息列表组件
-->
<template>
  <div
    class="comment-message-list-container"
    v-loading="loading"
  >
    <p class="title">
      新增 <strong>{{ this.userInfo.unreadCommentNum }}</strong> 个评论<span>（共{{ commentNum }}条记录）</span>
    </p>

    <el-divider></el-divider>

    <div class="message-list">
      <div
        class="message-container"
        v-for="(message, index) in commentList"
        :key="message.id"
      >
        <img
          class="message-head"
          :src="message.commentHead"
        />

        <div class="message-main">
          <div class="message-header">
            <p class="nickname">{{ message.commentNickname }}</p>
            <img
              class="vip"
              :src="vipList[`vip${message.commentVip}`]"
            />
            <p class="message-text">评论了你的帖子</p>
          </div>

          <p class="post-title">{{ message.postTitle }}</p>

          <el-divider content-position="left"><i class="el-icon-chat-line-square" /></el-divider>

          <p class="comment-content">{{ message.commentContent }}</p>
        </div>

        <div class="message-right">
          <p class="time">{{ message.commentTime }}</p>
          <p
            class="reply"
            @click="notOpen"
          >
            回复
          </p>
        </div>

        <div
          class="new-message"
          v-if="newTagHandle(index)"
        >
          new
        </div>
      </div>
    </div>

    <el-pagination
      :page-size="pageSize"
      :total="commentNum"
      layout="prev, pager, next"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vip1 from '@/assets/images/vip1.png'
import vip2 from '@/assets/images/vip2.png'
import vip3 from '@/assets/images/vip3.png'
import vip4 from '@/assets/images/vip4.png'
import vip5 from '@/assets/images/vip5.png'
import vip6 from '@/assets/images/vip6.png'
import { getUnreadCommentNum, getCommentMessageList } from '@/apis/userMessage'
import resHandle from '@/utils/resHandle'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommentMessageList',

  data() {
    return {
      loading: false,

      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },

      pagerCount: 7,
      pageSize: 5,
      currentPage: 1,

      commentNum: 0,
      commentList: [],
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    ...mapMutations(['updateUserInfo']),

    // 未开通功能提示
    notOpen() {
      this.$message.warning('此功能未开通')
    },

    // 判断当前消息是否未读（仅用于显示newTag）
    newTagHandle(index) {
      const currentIndex = (this.currentPage - 1) * this.pageSize + (index + 1)
      return currentIndex <= this.userInfo.unreadCommentNum
    },

    // 在store中更新用户未读评论数
    async updateCommentNum() {
      const res = await getUnreadCommentNum()
      resHandle(res, {
        successHandle: () => {
          this.updateUserInfo({ unreadCommentNum: res.data.unreadCommentNum })
        },
      })
    },

    // 获取评论消息列表
    async getCommentMessageList() {
      const res = await getCommentMessageList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
      resHandle(res, {
        successHandle: () => {
          this.commentNum = res.data.commentNum
          this.commentList = res.data.commentList
        },
        finallyHandle: () => {
          this.loading = false
        },
      })
    },

    async toPage() {
      this.loading = true

      await this.getCommentMessageList()
    },
  },

  async created() {
    this.loading = true

    await this.updateCommentNum()
    await this.getCommentMessageList()
  },

  async beforeDestroy() {
    await this.updateCommentNum()
  },
}
</script>

<style scoped lang="scss">
.comment-message-list-container {
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

    span {
      color: #c0c4cc;
    }
  }

  .message-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;

    .message-container {
      position: relative;
      width: 100%;
      display: flex;
      padding: 30px 0;
      // border-bottom: 1px solid #e4e7ed;

      .message-head {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .message-main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .message-header {
          display: flex;
          justify-items: center;

          .nickname {
            font-weight: bold;
            cursor: pointer;

            &:hover {
              color: #409eff;
            }
          }

          .vip {
            height: 15px;
            margin: 0 10px 0 3px;
          }

          .message-text {
            color: #909399;
          }
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
        }
      }

      .message-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 10px;

        .time {
          color: #909399;
        }

        .reply {
          color: black;
          font-weight: bold;
          cursor: pointer;

          &:hover {
            color: #409eff;
          }
        }
      }

      .new-message {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 35px;
        height: 18px;
        font-size: 12px;
        color: white;
        background: red;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
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
