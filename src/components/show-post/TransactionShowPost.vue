<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-15 14:37:07
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 22:09:41
 * @FilePath: \campus-grocery\src\components\show-post\TransactionShowPost.vue
 * @Description: 展示二手交易帖子组件
-->
<template>
  <div :class="{ 'transaction-show-post': true, 'opacity-style': opacityControl }">
    <header>
      <p class="post-title">{{ title }}</p>

      <div class="user-info">
        <img
          :src="userInfo.head"
          class="head"
        />
        <div class="info">
          <div class="nickname-container">
            <p class="nickname">{{ userInfo.nickname }}</p>
            <img
              :src="vipList[`vip${userInfo.vip}`]"
              class="vip"
            />
          </div>
          <p class="signature">{{ userInfo.signature ? userInfo.signature : '这个人很懒，什么都没有留下' }}</p>
        </div>
      </div>

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
      :id="id"
      postType="transaction"
      :buyButton="true"
      @openCommentDrawer="openCommentDrawer"
    />

    <CommentDrawer
      :commentDrawerSwitch="commentDrawerSwitch"
      :id="id"
      postType="transaction"
      @closeCommentDrawer="closeCommentDrawer"
    />
  </div>
</template>

<script>
import vip1 from '@/assets/images/vip1.png'
import vip2 from '@/assets/images/vip2.png'
import vip3 from '@/assets/images/vip3.png'
import vip4 from '@/assets/images/vip4.png'
import vip5 from '@/assets/images/vip5.png'
import vip6 from '@/assets/images/vip6.png'
import { getPost } from '@/apis/getPost'
import resHandle from '@/utils/resHandle'
import { mapMutations } from 'vuex'
import CommentDrawer from './components/CommentDrawer.vue'
import ShowPostAside from './components/ShowPostAside.vue'

export default {
  name: 'TransactionShowPost',

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  components: {
    CommentDrawer,
    ShowPostAside,
  },

  data() {
    return {
      // 防止页面加载时闪烁
      opacityControl: true,
      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },
      commentDrawerSwitch: false,
      title: '',
      userInfo: {
        head: '',
        nickname: '',
        vip: -1,
        signature: '',
      },
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
      postType: 'transaction',
      id: this.id,
    })
    const { postData, userInfo } = res.data

    resHandle(res, {
      successHandle: () => {
        ;[
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
          this.userInfo.head,
          this.userInfo.nickname,
          this.userInfo.vip,
          this.userInfo.signature,
        ] = [
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
          userInfo.head,
          userInfo.nickname,
          userInfo.vip,
          userInfo.signature,
        ]

        this.opacityControl = false
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

.opacity-style {
  opacity: 0;
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

    .user-info {
      @include flex-center;
      margin: 15px 0 25px 0;

      .head {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        object-fit: cover;
        cursor: pointer;
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .nickname-container {
          display: flex;
          align-items: center;

          .nickname {
            font-size: 24px;
            margin-right: 5px;
            cursor: pointer;
          }

          .vip {
            height: 18px;
            cursor: pointer;
          }
        }

        .signature {
          color: #606266;
          font-size: 15px;
        }
      }
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
  }
}
</style>
