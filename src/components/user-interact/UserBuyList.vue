<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 16:10:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 18:24:45
 * @FilePath: \campus-grocery\src\components\user-interact\UserBuyList.vue
 * @Description: 用户求购列表组件
-->
<template>
  <div
    class="user-buy-list-container"
    v-loading="loading"
  >
    <p class="title">
      您求购了 <strong>{{ userBuyNum }}</strong> 个帖子
    </p>

    <el-divider></el-divider>

    <div class="record-list">
      <div
        class="record-container"
        v-for="record in userBuyList"
        :key="record.id"
      >
        <div class="record-main">
          <p class="record-text">您求购了帖子</p>

          <p
            class="post-title"
            @click="toPost(record)"
          >
            {{ record.postTitle }}
          </p>
        </div>

        <p class="record-time">{{ record.buyTime }}</p>
      </div>
    </div>

    <el-pagination
      :page-size="pageSize"
      :total="userBuyNum"
      layout="prev, pager, next"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserBuyNum, getUserBuyList } from '@/apis/userInteract'
import resHandle from '@/utils/resHandle'

export default {
  name: 'UserBuyList',

  data() {
    return {
      loading: false,

      pagerCount: 7,
      pageSize: 7,
      currentPage: 1,
      userBuyNum: 0,
      userBuyList: [],
    }
  },

  methods: {
    // 前往某一页
    async toPage() {
      this.loading = true

      await this.getUserBuyList()
    },

    // 获取用户求购帖子个数
    async getUserBuyNum() {
      const res = await getUserBuyNum()
      resHandle(res, {
        successHandle: () => {
          this.userBuyNum = res.data.userBuyNum
        },
      })
    },

    // 获取用户求购列表
    async getUserBuyList() {
      const res = await getUserBuyList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })

      resHandle(res, {
        successHandle: () => {
          this.userBuyList = res.data.userBuyList
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

    await this.getUserBuyNum()
    await this.getUserBuyList()
  },
}
</script>

<style scoped lang="scss">
.user-buy-list-container {
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
      margin: 10px 0 35px 0;
      border-bottom: 1px solid #e4e7ed;

      &:last-of-type {
        margin-bottom: 0;
      }

      .record-main {
        height: 60px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .record-text {
          text-align: left;
          color: #909399;
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

      .record-time {
        display: flex;
        align-items: flex-end;
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
