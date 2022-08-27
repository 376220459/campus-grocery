<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 16:10:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 17:13:26
 * @FilePath: \campus-grocery\src\components\message\SystemMessageList.vue
 * @Description: 系统消息列表组件
-->
<template>
  <div
    class="system-message-list-container"
    v-loading="loading"
  >
    <p class="title">
      新增 <strong>{{ this.userInfo.unreadSystemNum }}</strong> 个系统消息<span>（共{{ systemNum }}条记录）</span>
    </p>

    <el-divider></el-divider>

    <div class="message-list">
      <div
        class="message-container"
        v-for="(message, index) in systemList"
        :key="message.id"
      >
        <div class="message-main">
          <div class="message-title">
            <p class="text">系统</p>
            <p class="title">{{ message.title }}</p>
          </div>

          <p class="message-content">{{ message.content }}</p>
        </div>

        <p class="message-time">{{ message.time }}</p>

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
      :total="systemNum"
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
import { getUnreadSystemNum, getSystemMessageList } from '@/apis/userMessage'
import resHandle from '@/utils/resHandle'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SystemMessageList',

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
      pageSize: 7,
      currentPage: 1,

      systemNum: 0,
      systemList: [],
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
      return currentIndex <= this.userInfo.unreadSystemNum
    },

    // 在store中更新用户未读系统消息数
    async updateSystemNum() {
      const res = await getUnreadSystemNum()
      resHandle(res, {
        successHandle: () => {
          this.updateUserInfo({ unreadSystemNum: res.data.unreadSystemNum })
        },
      })
    },

    // 获取系统消息消息列表
    async getSystemMessageList() {
      const res = await getSystemMessageList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
      resHandle(res, {
        successHandle: () => {
          this.systemNum = res.data.systemNum
          this.systemList = res.data.systemList
        },
        finallyHandle: () => {
          this.loading = false
        },
      })
    },

    // 前往某一页
    async toPage() {
      this.loading = true

      await this.getSystemMessageList()
    },
  },

  async created() {
    this.loading = true

    await this.updateSystemNum()
    await this.getSystemMessageList()
  },

  async beforeDestroy() {
    await this.updateSystemNum()
  },
}
</script>

<style scoped lang="scss">
.system-message-list-container {
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
      flex-direction: column;
      padding: 20px 0;
      border-bottom: 1px solid #e4e7ed;

      .message-main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 15px;

        .message-title {
          display: flex;
          align-items: center;
          margin-bottom: 15px;

          .text {
            padding: 2px 5px;
            font-size: 12px;
            border: 1px solid #dcdfe6;
            border-radius: 3px;
            margin-right: 5px;
          }

          .title {
            font-weight: bold;
          }
        }

        .message-content {
          padding: 0 20px;
          text-align: left;
          line-height: 1.5em;
        }
      }

      .message-time {
        display: flex;
        justify-content: end;
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
