<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-15 14:37:07
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 16:48:07
 * @FilePath: \campus-grocery\src\components\show-post\TransactionShowPost.vue
 * @Description: 展示二手交易帖子组件
-->
<template>
  <div
    v-if="postTelNumber"
    class="transaction-show-post"
  >
    <header>
      <p class="post-title">{{ title }}</p>

      <PostUserInfo
        v-if="postTelNumber"
        :telNumber="postTelNumber"
      />

      <p class="browse-count">
        <i class="el-icon-view" />
        <span>{{ browseCount }} 人看过</span>
      </p>

      <p class="post-time">{{ postTime }}</p>
    </header>

    <el-divider>
      <i class="el-icon-caret-top" />
    </el-divider>

    <main>
      <div class="post-content">{{ content }}</div>

      <p class="attribute-container">
        <i class="el-icon-tickets" />
        <span class="text">商品类别：</span>
        <span class="content">{{ productCategory }}</span>
      </p>

      <p class="attribute-container">
        <i class="el-icon-time" />
        <span class="text">成色：</span>
        <span class="content">{{ condition }}</span>
      </p>

      <div class="attribute-container">
        <i class="el-icon-location-outline" />
        <span class="text"> 交易地点： </span>
        <span class="content"> {{ transactionPlace }} </span>
        <p class="place-tips">
          【注意：为防止上当受骗，本站仅允许<strong>校内交易</strong>，如发现交易地址不在校内，请立即举报，谢谢！】
        </p>
      </div>

      <p class="attribute-container">
        <i class="el-icon-price-tag" />
        <span class="text">价格：</span>
        <span class="content">{{ price }}</span>
      </p>

      <p class="attribute-container">
        <i class="el-icon-user" />
        <span class="text">联系人：</span>
        <span class="content">{{ liaisonName }}</span>
      </p>

      <p class="attribute-container">
        <i class="el-icon-phone-outline" />
        <span class="text">手机号：</span>
        <span class="content">{{ liaisonTel }}</span>
      </p>

      <el-divider>
        <i class="el-icon-caret-top" />
      </el-divider>

      <div class="imgs">
        <img
          v-for="(item, index) in imgs"
          :key="index"
          :src="item"
        />
      </div>
    </main>

    <ShowPostAside
      v-if="postTelNumber"
      :id="id"
      :postType="postType"
      :postTelNumber="postTelNumber"
      :buyButton="true"
      @openCommentDrawer="openCommentDrawer"
    />

    <CommentDrawer
      :commentDrawerSwitch="commentDrawerSwitch"
      :id="id"
      :postType="postType"
      @closeCommentDrawer="closeCommentDrawer"
    />
  </div>
</template>

<script>
import { getPost } from '@/apis/getPost'
import resHandle from '@/utils/resHandle'
import { mapMutations } from 'vuex'
import CommentDrawer from './components/CommentDrawer.vue'
import ShowPostAside from './components/ShowPostAside.vue'
import PostUserInfo from './components/PostUserInfo.vue'

export default {
  name: 'TransactionShowPost',

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  components: {
    PostUserInfo,
    CommentDrawer,
    ShowPostAside,
  },

  data() {
    return {
      commentDrawerSwitch: false,
      postType: 'transaction',
      postTelNumber: '',
      title: '',
      browseCount: 0,
      postTime: '',
      content: '',
      productCategory: '',
      condition: '',
      price: '',
      transactionPlace: '',
      liaisonName: '',
      liaisonTel: '',
      imgs: [],
    }
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 打开评论抽屉
    openCommentDrawer() {
      this.commentDrawerSwitch = true
    },

    // 关闭评论抽屉
    closeCommentDrawer() {
      this.commentDrawerSwitch = false
    },
  },

  async created() {
    const res = await getPost({
      postType: this.postType,
      id: this.id,
    })
    const { postData } = res.data

    resHandle(res, {
      successHandle: () => {
        ;[
          this.postTelNumber,
          this.title,
          this.postTime,
          this.content,
          this.productCategory,
          this.condition,
          this.price,
          this.transactionPlace,
          this.liaisonName,
          this.liaisonTel,
          this.browseCount,
          this.imgs,
        ] = [
          postData.telNumber,
          postData.title,
          postData.postTime,
          postData.content,
          postData.productCategory,
          postData.condition,
          postData.price,
          postData.transactionPlace,
          postData.liaisonName,
          postData.liaisonTel,
          postData.browseCount,
          [postData.mainImg, ...postData.imgs],
        ]
      },

      warningHandle: () => {
        if (res.code === 2) {
          this.$emit('notFound')
        }
      },

      finallyHandle: () => {
        this.updateLoading({
          loading: false,
        })
      },
    })
  },
}
</script>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.transaction-show-post {
  width: 1100px;
  min-width: 1100px;
  background: white;
  padding: 30px;
  border-radius: 10px;

  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .post-title {
      font-size: 30px;
      font-weight: bold;
    }

    .browse-count {
      i {
        margin: 0 5px;
      }
      color: #606266;
    }

    .post-time {
      color: #afb3bb;
      width: 100%;
      text-align: right;
      margin-right: 5px;
    }
  }

  main {
    .post-content {
      text-align: left;
      font-size: 18px;
      line-height: 1.8em;
      white-space: pre-wrap;
      box-shadow: 0px 0px 3px #8f8f8f;
      border-radius: 10px;
      padding: 30px 20px;
      margin: 30px 0;
    }

    .attribute-container {
      padding: 0 20px;
      margin-bottom: 20px;
      text-align: left;

      .text {
        color: #909399;
        margin-left: 5px;
      }

      .content {
        font-size: 18px;
        font-weight: bold;
      }

      .place-tips {
        color: red;
        margin-top: 10px;
      }
    }

    .imgs {
      @include flex-center;
      flex-direction: column;

      img {
        max-width: 900px;
        border-radius: 5px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
