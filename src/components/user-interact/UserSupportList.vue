<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 16:10:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 18:26:38
 * @FilePath: \campus-grocery\src\components\user-interact\UserSupportList.vue
 * @Description: 用户点赞列表组件
-->
<template>
  <div
    class="user-support-list-container"
    v-loading="loading"
  >
    <p class="title">
      您点赞了 <strong>{{ userSupportNum }}</strong> 个帖子
    </p>

    <el-divider></el-divider>

    <div class="record-list">
      <div
        class="record-container"
        v-for="record in userSupportList"
        :key="record.id"
      >
        <div class="record-main">
          <p class="record-text">您点赞了帖子</p>

          <p
            class="post-title"
            @click="toPost(record)"
          >
            {{ record.postTitle }}
          </p>
        </div>

        <p class="record-time">{{ record.supportTime }}</p>
      </div>
    </div>

    <el-pagination
      :page-size="pageSize"
      :total="userSupportNum"
      layout="prev, pager, next"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserSupportNum, getUserSupportList } from '@/apis/userInteract'
import resHandle from '@/utils/resHandle'

export default {
  name: 'UserSupportList',

  data() {
    return {
      loading: false,

      pagerCount: 7,
      pageSize: 7,
      currentPage: 1,
      userSupportNum: 0,
      userSupportList: [],
    }
  },

  methods: {
    // 前往某一页
    async toPage() {
      this.loading = true

      await this.getUserSupportList()
    },

    // 获取用户点赞帖子个数
    async getUserSupportNum() {
      const res = await getUserSupportNum()
      resHandle(res, {
        successHandle: () => {
          this.userSupportNum = res.data.userSupportNum
        },
      })
    },

    // 获取用户点赞列表
    async getUserSupportList() {
      const res = await getUserSupportList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })

      resHandle(res, {
        successHandle: () => {
          this.userSupportList = res.data.userSupportList
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

    await this.getUserSupportNum()
    await this.getUserSupportList()
  },
}
</script>

<style scoped lang="scss">
.user-support-list-container {
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
