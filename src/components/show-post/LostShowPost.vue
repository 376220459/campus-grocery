<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-15 14:37:07
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-17 19:09:51
 * @FilePath: \campus-grocery\src\components\show-post\LostShowPost.vue
 * @Description: 展示失物招领帖子组件
-->
<template>
  <div class="lost-show-post">
    <header>
      <p class="post-title">{{ title }}</p>

      <div class="user-info">
        <img
          :src="user.head"
          class="head"
        />
        <div class="info">
          <div class="nickname-container">
            <p class="nickname">{{ user.nickname }}</p>
            <img
              :src="vipList[`vip${user.vip}`]"
              class="vip"
            />
          </div>
          <p class="signature">{{ user.signature.length ? user.signature : '这个人很懒，什么都没有留下' }}</p>
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
      <div class="post-content">
        {{ content }}
      </div>

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
          class="attribute-container"
          @click="notOpen"
        >
          <i class="el-icon-warning-outline" />
          <p>举报</p>
        </div>
      </div>
    </aside>

    <CommentDrawer
      :commentDrawerSwitch="commentDrawerSwitch"
      :id="id"
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
import CommentDrawer from './components/CommentDrawer.vue'

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
  },

  data() {
    return {
      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },
      commentDrawerSwitch: false,
      title: 'iphone13 Pro Max半价大甩卖啦！！！',
      user: {
        head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
        nickname: 'Hole',
        vip: 6,
        signature: '',
      },
      browseCount: 998,
      postTime: '2022-07-17',
      content: `iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13
        Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！iphone13 Pro
        Max半价大甩卖啦！！！iphone13 Pro Max半价大甩卖啦！！！`,
      receivePlace: '西安邮电大学东区一楼饭堂北门处',
      liaisonName: '张三',
      liaisonTel: 18300000000,
      imgs: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
      ],
      isSupport: false,
      supportNum: 9913,
      commentNum: 1112,
      commentList: [
        {
          id: 0,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          commentTime: '2022-07-17',
          content: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 1,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 2,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 3,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 4,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
        {
          id: 5,
          head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F30%2F20200330091314_yNVUZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662635156&t=0d0bdfaf86b4c8f8a7483d13dc029da5',
          nickname: 'Hole',
          commentTime: '2022-07-17',
          commentContent: '可以小刀吗？还是感觉有点贵啊，6000以内可以考虑，哈哈。',
        },
      ],
    }
  },

  methods: {
    // 打开评论抽屉
    openCommentDrawer() {
      this.commentDrawerSwitch = true
    },

    // 关闭评论抽屉
    closeCommentDrawer() {
      this.commentDrawerSwitch = false
    },

    // 未开通功能提示
    notOpen() {
      this.$message.warning('此功能未开通')
    },

    // 点赞
    support() {
      if (this.isSupport) {
        alert('已取消点赞')
      } else {
        alert('点赞成功')
      }
      this.isSupport = !this.isSupport
    },
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
      text-indent: 2em;
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
    }
  }
}
</style>
