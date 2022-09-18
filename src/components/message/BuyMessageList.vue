<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 16:10:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 17:11:12
 * @FilePath: \campus-grocery\src\components\message\BuyMessageList.vue
 * @Description: 求购消息列表组件
-->
<template>
  <div
    class="buy-message-list-container"
    v-loading="loading"
  >
    <p class="title">
      新增 <strong>{{ this.userInfo.unreadBuyNum }}</strong> 个求购<span>（共{{ buyNum }}条记录）</span>
    </p>

    <el-divider></el-divider>

    <div class="message-list">
      <div
        class="message-container"
        v-for="(message, index) in buyList"
        :key="message.id"
      >
        <img
          class="message-head"
          :src="message.buyHead"
        />

        <div class="message-main">
          <div class="message-header">
            <p class="nickname">{{ message.buyNickname }}</p>
            <img
              class="vip"
              :src="vipList[`vip${message.buyVip}`]"
            />
            <p class="message-text">求购了你的帖子</p>
          </div>

          <p
            class="post-title"
            @click="toPost(message)"
          >
            {{ message.postTitle }}
          </p>
        </div>

        <p class="message-time">{{ message.buyTime }}</p>

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
      :total="buyNum"
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
import { getUnreadBuyNum, getBuyMessageList } from '@/apis/userMessage'
import resHandle from '@/utils/resHandle'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'BuyMessageList',

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
      pageSize: 8,
      currentPage: 1,

      buyNum: 0,
      buyList: [],
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    ...mapMutations(['updateUserInfo']),

    // 判断当前消息是否未读（仅用于显示newTag）
    newTagHandle(index) {
      const currentIndex = (this.currentPage - 1) * this.pageSize + (index + 1)
      return currentIndex <= this.userInfo.unreadBuyNum
    },

    // 在store中更新用户未读求购数
    async updateBuyNum() {
      const res = await getUnreadBuyNum()
      resHandle(res, {
        successHandle: () => {
          this.updateUserInfo({ unreadBuyNum: res.data.unreadBuyNum })
        },
      })
    },

    // 获取求购消息列表
    async getBuyMessageList() {
      const res = await getBuyMessageList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
      resHandle(res, {
        successHandle: () => {
          this.buyNum = res.data.buyNum
          this.buyList = res.data.buyList
        },
        finallyHandle: () => {
          this.loading = false
        },
      })
    },

    // 前往某一页
    async toPage() {
      this.loading = true

      await this.getBuyMessageList()
    },

    // 前往帖子界面
    toPost(message) {
      const { postId: id, postType } = message
      this.$router.push(`/showPost?postType=${postType}&id=${id}`)
    },
  },

  async created() {
    this.loading = true

    await this.updateBuyNum()
    await this.getBuyMessageList()
  },

  async beforeDestroy() {
    await this.updateBuyNum()
  },
}
</script>

<style scoped lang="scss">
.buy-message-list-container {
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
      border-bottom: 1px solid #e4e7ed;

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
      }

      .message-time {
        display: flex;
        align-items: flex-end;
        color: #909399;
        margin-right: 10px;
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
