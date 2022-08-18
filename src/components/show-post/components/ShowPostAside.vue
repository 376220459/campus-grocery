<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-18 18:58:36
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 21:36:18
 * @FilePath: \campus-grocery\src\components\show-post\components\ShowPostAside.vue
 * @Description: 帖子展示界面侧边栏组件
-->
<template>
  <aside>
    <div class="aside-container">
      <div
        :class="{
          'attribute-container': true,
          'is-support': isSupport,
        }"
        @click="support"
      >
        <i class="iconfont icon-dianzan" />
        <p>{{ supportNum >= 999 ? '999+' : supportNum }} 人赞过</p>
      </div>

      <div
        class="attribute-container"
        @click="openCommentDrawer"
      >
        <i class="iconfont icon-pinglun" />
        <p>{{ commentNum >= 999 ? '999+' : commentNum }} 个评论</p>
      </div>

      <div
        v-if="buyButton"
        :class="{
          'attribute-container': true,
          'is-bought': isBought,
        }"
        @click="buy"
      >
        <i class="iconfont icon-dianyingpiao" />
        <p>{{ buyNum >= 999 ? '999+' : buyNum }} 人想要</p>
      </div>

      <div
        class="attribute-container"
        @click="notOpen"
      >
        <i class="el-icon-warning-outline" />
        <p>举报</p>
      </div>
    </div>
  </aside>
</template>

<script>
import { getPostInteractive } from '@/apis/getPost'
import { supportPost, cancelSupportPost, buyPost, cancelBuyPost } from '@/apis/handlePost'
import resHandle from '@/utils/resHandle'
import getCurrentTime from '@/utils/getCurrentTime'

export default {
  name: 'ShowPostAside',

  props: {
    postType: {
      type: String,
      required: true,
    },

    id: {
      type: Number,
      required: true,
    },

    buyButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isSupport: false,
      isBought: false,
      supportNum: 0,
      commentNum: 0,
      buyNum: 0,
    }
  },

  methods: {
    // 未开通功能提示
    notOpen() {
      this.$message.warning('此功能未开通')
    },

    // 点赞（取消点赞）
    async support() {
      if (this.isSupport) {
        const res = await cancelSupportPost({ postType: this.postType, id: this.id })
        resHandle(res, {
          successHandle: () => {
            this.supportNum--
            this.isSupport = !this.isSupport
          },
        })
      } else {
        const res = await supportPost({ postType: this.postType, id: this.id, supportTime: getCurrentTime() })
        resHandle(res, {
          successHandle: () => {
            this.supportNum++
            this.isSupport = !this.isSupport
            alert('此处要通知楼主')
          },
        })
      }
    },

    // 想要（取消想要）
    async buy() {
      if (this.isBought) {
        const res = await cancelBuyPost({ postType: this.postType, id: this.id })
        resHandle(res, {
          successHandle: () => {
            this.buyNum--
            this.isBought = !this.isBought
          },
        })
      } else {
        const res = await buyPost({ postType: this.postType, id: this.id, buyTime: getCurrentTime() })
        resHandle(res, {
          successHandle: () => {
            this.buyNum++
            this.isBought = !this.isBought
            alert('此处要通知楼主')
          },
        })
      }
    },

    // 打开评论抽屉
    openCommentDrawer() {
      this.$emit('openCommentDrawer')
    },
  },

  async created() {
    // 组件创建完成后，获取相关数据
    const res = await getPostInteractive({ postType: this.postType, id: this.id })
    const { supportNum, commentNum, buyNum, isSupport, isBought } = res.data
    ;[this.supportNum, this.commentNum, this.buyNum, this.isSupport, this.isBought] = [
      supportNum,
      commentNum,
      buyNum,
      isSupport,
      isBought,
    ]
  },
}
</script>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.aside-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .attribute-container {
    @include flex-center;
    margin-top: 20px;
    cursor: pointer;
    transition: all 0.3s;

    &:nth-of-type(1) {
      margin-top: 0;
    }

    &:hover {
      transform: scale(1.1);
      color: #409eff;
    }

    i {
      font-size: 35px;
      margin-right: 10px;
    }

    p {
      font-size: 18px;
    }
  }

  .is-support {
    color: #409eff;
  }

  .is-bought {
    color: #409eff;
  }
}
</style>
