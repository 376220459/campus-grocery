<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-17 17:15:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 21:33:33
 * @FilePath: \campus-grocery\src\components\show-post\components\CommentDrawer.vue
 * @Description: 帖子评论抽屉组件
-->
<template>
  <el-drawer
    size="500px"
    :visible="commentDrawerSwitch"
    :wrapperClosable="false"
    @close="closeCommentDrawer"
  >
    <p
      slot="title"
      class="comment-drawer-title"
    >
      共
      <strong>{{ commentNum >= 999 ? '999+' : commentNum }}</strong>
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
          v-if="commentList.length === 0"
        >
          帖子还没有评论，快来占个沙发吧！
        </p>

        <div
          class="comment-list"
          v-else
        >
          <div
            v-for="comment in commentList"
            :key="comment.id"
            class="comment-container"
          >
            <img
              :src="comment.head"
              class="user-head"
            />

            <div class="comment-container-right">
              <div class="user-nickname-container">
                <p class="user-nickname">{{ comment.nickname }}</p>
                <img
                  :src="vipList[`vip${comment.vip}`]"
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
            :page-size="6"
            :total="commentNum"
            layout="prev, pager, next"
            :pager-count="8"
            :current-page.sync="currentCommentPage"
            @current-change="toCommentPage"
            v-if="commentList.length !== 0"
          >
          </el-pagination>

          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            autofocus
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
      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },
      commentNum: 1112,
      commentLoading: false,
      currentCommentPage: 1,
      commentInput: '',
      commentList: [
        {
          id: 0,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          vip: 6,
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 1,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          vip: 6,
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 2,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          vip: 6,
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 3,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          vip: 6,
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 4,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          vip: 6,
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 5,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          vip: 6,
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
      ],
    }
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

    // 前往某一页的回调
    toCommentPage(pageNum) {
      this.commentLoading = true
      setTimeout(() => {
        this.commentLoading = false
        alert(`切换到第${pageNum}页`)
      }, 1000)
    },

    // 发送评论
    comment() {
      alert(`您评论的内容：${this.commentInput}`)
    },
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
    position: relative;
    margin-bottom: 250px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;

    .comment-container {
      margin: 20px 0;
      display: flex;

      .user-head {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .comment-container-right {
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
