<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-19 17:16:30
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 00:24:00
 * @FilePath: \campus-grocery\src\components\show-post\components\PostInteractPopover.vue
 * @Description: 帖子交互信息弹窗组件
-->
<template>
  <el-popover
    placement="left"
    trigger="click"
    width="270"
    :disabled="!support && !buy"
  >
    <!-- 插槽  -->
    <slot slot="reference"></slot>

    <div
      class="popover-container"
      v-loading="loading"
    >
      <p
        class="record-title"
        v-if="support"
      >
        <strong>{{ postSupportNum }}</strong> 人赞了你的帖子
      </p>
      <p
        class="record-title"
        v-if="buy"
      >
        <strong>{{ postBuyNum }}</strong> 人想要你的宝贝
      </p>
      <el-divider><i class="el-icon-caret-top" /></el-divider>

      <template v-if="postSupportNum === 0 && postBuyNum === 0">
        <p
          class="no-interact-tips"
          v-if="support"
        >
          还没有人给你点赞，继续加油吧
        </p>
        <p
          class="no-interact-tips"
          v-if="buy"
        >
          还没有人想要你的宝贝，再等等吧
        </p>
      </template>

      <template v-else>
        <div
          class="record-list"
          v-if="support"
          v-infinite-scroll="listLoad"
          :infinite-scroll-distance="15"
          :infinite-scroll-disabled="scrollDisabled"
        >
          <p
            class="record"
            v-for="support in postSupportList"
            :key="support.id"
          >
            <strong class="nickname">{{ support.supportNickname }}</strong> 赞了你的帖子
          </p>

          <p
            v-if="listLoading"
            class="loading-text"
          >
            加载中...
          </p>
          <el-divider v-if="noMore"><span class="no-more-text">到底了</span></el-divider>
        </div>

        <div
          class="record-list"
          v-if="buy"
          v-infinite-scroll="listLoad"
          :infinite-scroll-distance="5"
          :infinite-scroll-disabled="scrollDisabled"
        >
          <p
            class="record"
            v-for="buy in postBuyList"
            :key="buy.id"
          >
            <strong class="nickname">{{ buy.buyNickname }}</strong> 想要你的宝贝
          </p>

          <p
            v-if="listLoading"
            class="loading-text"
          >
            加载中...
          </p>
          <el-divider v-if="noMore"><span class="no-more-text">到底了</span></el-divider>
        </div>
      </template>
    </div>
  </el-popover>
</template>

<script>
import { getPostSupportNum, getPostSupportList, getPostBuyNum, getPostBuyList } from '@/apis/postInteract'
import resHandle from '@/utils/resHandle'

export default {
  name: 'PostInteractPopover',

  props: {
    support: {
      type: Boolean,
      default: false,
    },

    buy: {
      type: Boolean,
      default: false,
    },

    postType: {
      type: String,
      required: true,
    },

    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 15,
      postSupportNum: 0,
      postSupportList: [],
      postBuyNum: 0,
      postBuyList: [],
      listLoading: false,
    }
  },

  computed: {
    // 没有更多了文字显示
    noMore() {
      if (this.support) {
        return this.postSupportList.length >= this.postSupportNum
      } else if (this.buy) {
        return this.postBuyList.length >= this.postBuyNum
      }

      return true
    },

    // 懒加载开关
    scrollDisabled() {
      return this.listLoading || this.noMore
    },
  },

  methods: {
    async listLoad() {
      this.listLoading = true
      this.pageNum++

      if (this.support) {
        await this.getSupportNum()
        await this.getSupportList()
      }
      if (this.buy) {
        await this.getBuyNum()
        await this.getBuyList()
      }
    },

    // 获取点赞数
    async getSupportNum() {
      const res = await getPostSupportNum({
        postType: this.postType,
        postId: this.id,
      })

      resHandle(res, {
        successHandle: () => {
          const postSupportNum = res.data.postSupportNum
          this.postSupportNum = postSupportNum
        },
      })
    },

    // 获取点赞列表
    async getSupportList() {
      const res = await getPostSupportList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        postType: this.postType,
        postId: this.id,
      })

      resHandle(res, {
        successHandle: () => {
          const postSupportList = res.data.postSupportList
          this.postSupportList = [...this.postSupportList, ...postSupportList]
        },
        finallyHandle: () => {
          this.loading = false
          this.listLoading = false
        },
      })
    },

    // 获取想要数
    async getBuyNum() {
      const res = await getPostBuyNum({
        postType: this.postType,
        postId: this.id,
      })

      resHandle(res, {
        successHandle: () => {
          const postBuyNum = res.data.postBuyNum
          this.postBuyNum = postBuyNum
        },
      })
    },

    // 获取想要列表
    async getBuyList() {
      const res = await getPostBuyList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        postType: this.postType,
        postId: this.id,
      })

      resHandle(res, {
        successHandle: () => {
          const postBuyList = res.data.postBuyList
          this.postBuyList = [...this.postBuyList, ...postBuyList]
        },
        finallyHandle: () => {
          this.loading = false
          this.listLoading = false
        },
      })
    },
  },

  async created() {
    this.loading = true

    this.postSupportList = []
    this.postBuyList = []

    if (this.support) {
      await this.getSupportNum()
      await this.getSupportList()
    }
    if (this.buy) {
      await this.getBuyNum()
      await this.getBuyList()
    }
  },
}
</script>

<style scoped lang="scss">
.popover-container {
  .record-title {
    font-size: 15px;
    color: #303133;

    strong {
      color: #e6a23c;
    }
  }

  .no-interact-tips {
    color: #909399;
    text-align: center;
    margin: 15px 0 10px 0;
  }

  .record-list {
    height: 250px;
    overflow: auto;
    padding: 0 5px;

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

    .record {
      margin-bottom: 10px;

      .nickname {
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }

    .loading-text {
      color: #909399;
      text-align: center;
    }

    .no-more-text {
      color: #c0c4cc;
    }
  }
}
</style>
