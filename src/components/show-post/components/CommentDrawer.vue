<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-17 17:15:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 17:48:07
 * @FilePath: \campus-grocery\src\components\show-post\components\CommentDrawer.vue
 * @Description: 帖子评论抽屉组件
-->
<template>
  <el-drawer
    size="500px"
    :visible="commentDrawerSwitch"
    :wrapperClosable="false"
    @close="closeCommentDrawer"
    @opened="openedCommentDrawer"
  >
    <p
      slot="title"
      class="comment-drawer-title"
    >
      共
      <strong>{{ postCommentNum | overHandle }}</strong>
      条评论
    </p>

    <div
      class="comment-drawer-contaner"
      v-loading="commentLoading"
      element-loading-text="加载中..."
    >
      <template>
        <p
          class="not-comment"
          v-if="postCommentList.length === 0"
        >
          帖子还没有评论，快来占个沙发吧！
        </p>

        <div
          class="comment-list"
          v-else
        >
          <div
            v-for="comment in postCommentList"
            :key="comment.id"
            class="comment-container"
          >
            <img
              :src="comment.commentHead"
              class="user-head"
            />

            <div class="comment-container-right">
              <div class="user-nickname-container">
                <p class="user-nickname">{{ comment.commentNickname }}</p>
                <img
                  :src="vipList[`vip${comment.commentVip}`]"
                  class="vip"
                />
              </div>

              <p class="comment-content">{{ comment.commentContent }}</p>

              <div class="comment-footer">
                <p class="comment-time">{{ comment.commentTime }}</p>

                <div class="comment-handle">
                  <p
                    class="handle-container"
                    @click="notOpen"
                  >
                    <i class="iconfont icon-pinglun" />
                    <span>回复</span>
                  </p>

                  <p
                    class="handle-container"
                    @click="notOpen"
                  >
                    <i class="iconfont icon-dianzan" />
                    <span>赞</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment-input">
          <el-pagination
            :page-size="pageSize"
            :total="postCommentNum"
            layout="prev, pager, next"
            :pager-count="pagerCount"
            :current-page.sync="currentCommentPage"
            @current-change="toCommentPage"
            v-if="postCommentList.length !== 0"
          >
          </el-pagination>

          <el-input
            ref="commentInput"
            type="textarea"
            :rows="3"
            resize="none"
            :maxlength="1000"
            :show-word-limit="true"
            placeholder="评论千万条，友善第一条"
            v-model="commentInput"
          ></el-input>

          <el-button
            type="primary"
            :disabled="commentInput.trim().length <= 0"
            @click="comment"
          >
            发送
          </el-button>
        </div>
      </template>
    </div>
  </el-drawer>
</template>

<script>
import vip1 from '@/assets/images/vip1.png'
import vip2 from '@/assets/images/vip2.png'
import vip3 from '@/assets/images/vip3.png'
import vip4 from '@/assets/images/vip4.png'
import vip5 from '@/assets/images/vip5.png'
import vip6 from '@/assets/images/vip6.png'
import { getPostCommentNum, getPostCommentList } from '@/apis/postInteract'
import { commentPost } from '@/apis/handlePost'
import resHandle from '@/utils/resHandle'
import getCurrentTime from '@/utils/getCurrentTime'

export default {
  name: 'CommentDrawer',

  props: {
    commentDrawerSwitch: {
      type: Boolean,
      required: true,
      default: false,
    },

    id: {
      type: Number,
      required: true,
    },

    postType: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      pageSize: 7,

      // 注意：ElementUI规定pagerCount的值只能是奇数
      pagerCount: 9,

      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },
      postCommentNum: 0,
      commentLoading: false,
      currentCommentPage: 1,
      commentInput: '',
      postCommentList: [
        {
          id: 0,
          commentHead: '',
          commentNickname: '',
          commentVip: -1,
          commentTime: '',
          commentContent: '',
        },
      ],
    }
  },

  filters: {
    // 大数字处理
    overHandle(value) {
      return value >= 999 ? '999+' : value
    },
  },

  methods: {
    // 未开通功能提示
    notOpen() {
      this.$message.warning('此功能未开通')
    },

    // 关闭抽屉的回调
    closeCommentDrawer() {
      this.$emit('closeCommentDrawer')
    },

    // 打开抽屉的回调
    openedCommentDrawer() {
      // 打开抽屉，让输入框获取焦点
      this.$refs.commentInput.focus()
    },

    // 前往某一页的回调
    async toCommentPage() {
      this.commentLoading = true
      await this.getPostCommentList()
    },

    // 发送评论
    async comment() {
      this.commentLoading = true

      const res = await commentPost({
        postType: this.postType,
        id: this.id,
        commentTime: getCurrentTime(),
        commentContent: this.commentInput,
      })
      resHandle(res, {
        successHandle: async () => {
          await this.getPostCommentNum()
          await this.getPostCommentList()
          this.commentInput = ''
        },
      })
    },

    // 获取评论数
    async getPostCommentNum() {
      const res = await getPostCommentNum({
        postType: this.postType,
        postId: this.id,
      })

      resHandle(res, {
        successHandle: () => {
          const postCommentNum = res.data.postCommentNum
          this.postCommentNum = postCommentNum
        },
      })
    },

    // 获取评论列表
    async getPostCommentList() {
      const res = await getPostCommentList({
        pageNum: this.currentCommentPage,
        pageSize: this.pageSize,
        postType: this.postType,
        postId: this.id,
      })

      resHandle(res, {
        successHandle: () => {
          const postCommentList = res.data.postCommentList
          this.postCommentList = postCommentList.map(postComment => {
            const { id, commentHead, commentNickname, commentVip, commentTime, commentContent } = postComment
            return { id, commentHead, commentNickname, commentVip, commentTime, commentContent }
          })
        },
        finallyHandle: () => {
          this.commentLoading = false
        },
      })
    },
  },

  async created() {
    this.commentLoading = true

    await this.getPostCommentNum()
    await this.getPostCommentList()
  },
}
</script>

<style scoped lang="scss">
.comment-drawer-title {
  color: black;
  text-align: left;
}
.comment-drawer-contaner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 20px 20px 20px;
  flex-direction: column;
  align-items: flex-start;

  .not-comment {
    color: #909399;
  }

  .comment-list {
    width: 100%;
    position: relative;
    margin-bottom: 250px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: rgb(239, 239, 239);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #333;
    }
    &::-webkit-scrollbar-corner {
      background: #179a16;
    }

    .comment-container {
      width: 100%;
      margin: 20px 0;
      display: flex;

      .user-head {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .comment-container-right {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 10px;

        p {
          text-align: left;
        }

        .user-nickname-container {
          display: flex;
          align-items: center;

          .user-nickname {
            font-size: 21px;
            color: black;
            margin-right: 3px;
          }

          .vip {
            height: 15px;
            cursor: pointer;
          }
        }

        .comment-content {
          line-height: 1.5em;
          margin: 5px 0 10px 0;
          white-space: pre-wrap;
        }

        .comment-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .comment-time {
            color: #afb3bb;
          }

          .comment-handle {
            display: flex;
            margin-right: 20px;

            .handle-container {
              cursor: pointer;
              color: #626c81;

              i {
                margin: 0 5px 0 15px;
              }

              &:hover {
                color: #409eff;
              }
            }
          }
        }
      }
    }
  }

  .comment-input {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    .el-pagination {
      margin-bottom: 50px;
    }
    .el-button {
      align-self: flex-end;
      margin: 10px;
    }
  }
}
</style>
