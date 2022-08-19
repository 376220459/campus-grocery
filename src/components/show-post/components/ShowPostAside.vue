<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-18 18:58:36
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 00:28:50
 * @FilePath: \campus-grocery\src\components\show-post\components\ShowPostAside.vue
 * @Description: 帖子展示界面侧边栏组件
-->
<template>
  <aside>
    <div class="aside-container">
      <PostInteractPopover
        :support="isOwnerPost"
        :postType="postType"
        :id="id"
      >
        <div
          :class="{
            'attribute-container': true,
            'suppport-attribute-container': true,
            'is-support': isSupport,
          }"
          @click="support"
        >
          <i class="iconfont icon-dianzan" />
          <p v-if="isOwnerPost">点赞列表</p>
          <p v-else>{{ supportNum >= 999 ? '999+' : supportNum }} 人赞过</p>
        </div>
      </PostInteractPopover>

      <div
        class="attribute-container"
        @click="openCommentDrawer"
      >
        <i class="iconfont icon-pinglun" />
        <p>{{ commentNum >= 999 ? '999+' : commentNum }} 个评论</p>
      </div>

      <PostInteractPopover
        :buy="isOwnerPost"
        :postType="postType"
        :id="id"
      >
        <div
          v-if="buyButton"
          :class="{
            'attribute-container': true,
            'is-bought': isBought,
          }"
          @click="buy"
        >
          <i class="iconfont icon-dianyingpiao" />
          <p v-if="isOwnerPost">想要列表</p>
          <p v-else>{{ buyNum >= 999 ? '999+' : buyNum }} 人想要</p>
        </div>
      </PostInteractPopover>

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
import { getPostInteract } from '@/apis/postInteract'
import { supportPost, cancelSupportPost, buyPost, cancelBuyPost } from '@/apis/handlePost'
import resHandle from '@/utils/resHandle'
import getCurrentTime from '@/utils/getCurrentTime'
import { mapState } from 'vuex'
import PostInteractPopover from './PostInteractPopover.vue'

export default {
  name: 'ShowPostAside',

  components: { PostInteractPopover },

  props: {
    postType: {
      type: String,
      required: true,
    },

    id: {
      type: Number,
      required: true,
    },

    postTelNumber: {
      type: [String, Number],
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

  computed: {
    ...mapState(['userInfo']),

    isOwnerPost() {
      return this.userInfo.telNumber === this.postTelNumber
    },
  },

  methods: {
    // 未开通功能提示
    notOpen() {
      this.$message.warning('此功能未开通')
    },

    // 点赞（取消点赞）
    async support() {
      if (this.isSupport) {
        // 前端先响应（提升用户体验）
        if (this.isOwnerPost) {
          return
        }
        this.supportNum--
        this.isSupport = !this.isSupport

        const res = await cancelSupportPost({ postType: this.postType, id: this.id })
        resHandle(res, {
          warningHandle: () => {
            this.supportNum++
            this.isSupport = !this.isSupport
          },
          errorHandle: () => {
            this.supportNum++
            this.isSupport = !this.isSupport
          },
        })
      } else {
        // 前端先响应（提升用户体验）
        if (this.isOwnerPost) {
          return
        }
        this.supportNum++
        this.isSupport = !this.isSupport

        const res = await supportPost({ postType: this.postType, id: this.id, supportTime: getCurrentTime() })
        resHandle(res, {
          warningHandle: () => {
            this.supportNum--
            this.isSupport = !this.isSupport
          },
          errorHandle: () => {
            this.supportNum--
            this.isSupport = !this.isSupport
          },
        })
      }
    },

    // 想要（取消想要）
    async buy() {
      if (this.isBought) {
        // 前端先响应（提升用户体验）
        if (this.isOwnerPost) {
          return
        }
        this.buyNum--
        this.isBought = !this.isBought
        this.$message.success('已取消想要')

        const res = await cancelBuyPost({ postType: this.postType, id: this.id })
        resHandle(res, {
          warningHandle: () => {
            this.buyNum++
            this.isBought = !this.isBought
          },
          errorHandle: () => {
            this.buyNum++
            this.isBought = !this.isBought
          },
        })
      } else {
        // 前端先响应（提升用户体验）
        if (this.isOwnerPost) {
          return
        }
        this.buyNum++
        this.isBought = !this.isBought
        this.$message.success('想要成功，快去联系宝贝主人吧')

        const res = await buyPost({ postType: this.postType, id: this.id, buyTime: getCurrentTime() })
        resHandle(res, {
          warningHandle: () => {
            this.buyNum--
            this.isBought = !this.isBought
          },
          errorHandle: () => {
            this.buyNum--
            this.isBought = !this.isBought
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
    const res = await getPostInteract({ postType: this.postType, id: this.id })
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

aside {
  position: fixed;
  top: 30%;
  margin-left: 1100px;
  width: 190px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 15px #00000071;
  display: flex;
  justify-content: center;

  .aside-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .attribute-container {
      @include flex-center;
      margin-top: 20px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
        color: #e6a23c;
      }

      i {
        font-size: 35px;
        margin-right: 10px;
      }

      p {
        font-size: 18px;
      }
    }

    .suppport-attribute-container {
      margin-top: 0;
    }

    .is-support {
      color: #e6a23c;
    }

    .is-bought {
      color: #e6a23c;
    }
  }
}
</style>
