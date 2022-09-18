<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-15 14:37:07
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 16:54:42
 * @FilePath: \campus-grocery\src\components\show-post\LostShowPost.vue
 * @Description: 展示失物招领帖子组件
-->
<template>
  <div
    v-if="postTelNumber"
    class="lost-show-post"
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

      <div class="attribute-container">
        <i class="el-icon-location-outline" />
        <span class="text"> 领取地点： </span>
        <span class="content"> {{ receivePlace }} </span>
        <p class="place-tips">
          【注意：为防止上当受骗，本站仅允许<strong>校内领取</strong>，如发现领取地址不在校内，请立即举报，谢谢！】
        </p>
      </div>

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
import PostUserInfo from './components/PostUserInfo.vue'

export default {
  name: 'LostShowPost',

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  components: {
    CommentDrawer,
    ShowPostAside,
    PostUserInfo,
  },

  data() {
    return {
      postType: 'lost',
      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },
      commentDrawerSwitch: false,
      postTelNumber: '',
      title: '',
      browseCount: 0,
      postTime: '',
      content: '',
      receivePlace: '',
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
          this.receivePlace,
          this.liaisonName,
          this.liaisonTel,
          this.browseCount,
          this.imgs,
        ] = [
          postData.telNumber,
          postData.title,
          postData.postTime,
          postData.content,
          postData.receivePlace,
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

.lost-show-post {
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
