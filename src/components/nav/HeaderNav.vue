<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-08 15:30:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-28 16:18:28
 * @FilePath: \campus-grocery\src\components\nav\HeaderNav.vue
 * @Description: 头部导航栏组件
-->
<template>
  <el-header height="70px">
    <img
      class="logo"
      src="@/assets/images/Grocery-Logo.png"
      alt="logo"
      @click="toHomePage"
    />

    <div class="search-input">
      <el-input
        class="input-with-select"
        placeholder="看看今天有什么校园大事件"
        v-model.trim="searchInput"
        @keyup.enter.native="search"
      >
        <el-select
          v-model="selectValue"
          slot="prepend"
        >
          <el-option
            label="二手交易"
            value="transaction"
          ></el-option>
          <el-option
            label="趣闻轶事"
            value="campus"
          ></el-option>
          <el-option
            label="失物招领"
            value="lost"
          ></el-option>
          <el-option
            label="广告推广"
            value="advert"
          ></el-option>
        </el-select>
      </el-input>

      <el-button
        icon="el-icon-search"
        type="warning"
        @click="search"
      ></el-button>
    </div>

    <div class="user">
      <el-popover
        placement="bottom"
        width="240"
        trigger="hover"
      >
        <img
          class="user-head"
          :src="userInfo.head"
          slot="reference"
        />

        <div class="user-info">
          <div class="info-header">
            <p class="nickname">{{ userInfo.nickname }}</p>
            <div class="vip">
              <img
                :src="vipList[`vip${userInfo.vip}`]"
                class="vip-icon"
              />
            </div>
          </div>

          <el-divider></el-divider>

          <div class="info-overview">
            <div class="overview">
              <p class="overview-num">{{ userInfo.credit }}</p>
              <p class="overview-text">信誉分</p>
            </div>

            <div class="overview">
              <p class="overview-num">{{ userInfo.supportNum }}</p>
              <p class="overview-text">获赞</p>
            </div>

            <div class="overview">
              <p class="overview-num">{{ userInfo.ledou }}</p>
              <p class="overview-text">乐豆</p>
            </div>
          </div>

          <el-divider></el-divider>

          <div class="info-nav">
            <div
              class="nav"
              @click="toUserInfoPage"
            >
              <svg
                class="icon nav-icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon-zhanghao"></use>
              </svg>
              <p>个人中心</p>
            </div>

            <div
              class="nav"
              @click="toUserAccountPage"
            >
              <svg
                class="icon nav-icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon-shouji"></use>
              </svg>
              <p>账号信息</p>
            </div>

            <div
              class="nav"
              @click="toUserPostList"
            >
              <svg
                class="icon nav-icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon-bianji"></use>
              </svg>
              <p>我的发布</p>
            </div>

            <div
              class="nav"
              @click="toUserInteract"
            >
              <svg
                class="icon nav-icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon-gonggao"></use>
              </svg>
              <p>我的互动</p>
            </div>
          </div>

          <el-divider></el-divider>

          <div
            class="logout"
            @click="logout"
          >
            <div class="logout-container">
              <i class="icon icon-tuichu" />
              <p>退出</p>
            </div>
          </div>
        </div>
      </el-popover>

      <el-badge :is-dot="unreadMessageSign">
        <el-popover
          placement="bottom"
          width="150"
          trigger="hover"
        >
          <div
            slot="reference"
            class="user-message-text"
            @click="toMessagePage('support')"
          >
            消息
          </div>

          <div class="message">
            <el-badge
              :value="userInfo.unreadSupportNum | numFilter"
              :max="99"
            >
              <div
                class="interact"
                @click="toMessagePage('support')"
              >
                <i class="iconfont icon-dianzan" />
                <p>点赞</p>
              </div>
            </el-badge>

            <el-badge
              :value="userInfo.unreadCommentNum | numFilter"
              :max="99"
            >
              <div
                class="interact"
                @click="toMessagePage('comment')"
              >
                <i class="iconfont icon-pinglun" />
                <p>评论</p>
              </div>
            </el-badge>

            <el-badge
              :value="userInfo.unreadBuyNum | numFilter"
              :max="99"
            >
              <div
                class="interact"
                @click="toMessagePage('buy')"
              >
                <i class="iconfont icon-dianyingpiao" />
                <p>求购</p>
              </div>
            </el-badge>

            <el-badge
              :value="userInfo.unreadSystemNum | numFilter"
              :max="99"
            >
              <div
                class="interact"
                @click="toMessagePage('system')"
              >
                <i class="iconfont icon-xiaoxizhongxin" />
                <p>系统通知</p>
              </div>
            </el-badge>
          </div>
        </el-popover>
      </el-badge>

      <el-popover
        placement="bottom"
        width="370"
        trigger="click"
        style="background: transparent"
      >
        <div
          slot="reference"
          class="join-vip-text"
        >
          入驻会员
        </div>

        <img
          src="@/assets/images/vip.jpg"
          alt="vip"
          width="340"
        />
      </el-popover>

      <el-button
        type="primary"
        icon="el-icon-edit-outline"
        @click="toPostPage"
        >我要发布</el-button
      >
    </div>
  </el-header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import vip1 from '@/assets/images/vip1.png'
import vip2 from '@/assets/images/vip2.png'
import vip3 from '@/assets/images/vip3.png'
import vip4 from '@/assets/images/vip4.png'
import vip5 from '@/assets/images/vip5.png'
import vip6 from '@/assets/images/vip6.png'
import { logout } from '@/apis/userAccount'
import resHandle from '@/utils/resHandle'

export default {
  name: 'HeaderNav',

  data() {
    return {
      searchInput: '',
      selectValue: 'campus',
      vipList: {
        vip1,
        vip2,
        vip3,
        vip4,
        vip5,
        vip6,
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),

    // 是否有未读消息的标志
    unreadMessageSign() {
      const { unreadSupportNum, unreadCommentNum, unreadBuyNum, unreadSystemNum } = this.userInfo
      return unreadSupportNum > 0 || unreadCommentNum > 0 || unreadBuyNum > 0 || unreadSystemNum > 0
    },
  },

  filters: {
    numFilter(value) {
      return value > 0 ? value : null
    },
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 前往主页
    toHomePage() {
      window.location.href = '/home'
    },

    // 前往发布帖界面
    toPostPage() {
      window.location.href = '/post'
    },

    // 前往消息界面
    toMessagePage(tab) {
      window.location.href = `/message?tab=${tab}`
    },

    // 模糊搜索
    search() {
      window.location.href = `/showPostList?postType=${this.selectValue}&searchData=${this.searchInput}`
    },

    // 前往用户帖子列表界面
    toUserPostList() {
      window.location.href = `/showPostList?userPostList=1`
    },

    // 前往用户互动界面
    toUserInteract() {
      window.location.href = `/userInteract`
    },

    // 前往用户个人信息界面
    toUserInfoPage() {
      window.location.href = `/userInfo`
    },

    // 前往用户账号信息界面
    toUserAccountPage() {
      window.location.href = `/userAccount`
    },

    // 退出登录
    async logout() {
      this.updateLoading({
        loading: true,
        loadingText: '正在注销登录，请稍等...',
      })

      const res = await logout()

      // 增加视觉延迟
      setTimeout(() => {
        resHandle(res, {
          finallyHandle: () => {
            // 跳转前先删除旧的登录token
            this.$cookies.remove('auth_token')

            window.location.href = process.env.VUE_APP_LOGIN

            this.updateLoading({
              loading: false,
            })
          },
        })
      }, 1000)
    },
  },
}
</script>

<style scoped lang="scss">
@mixin scale-text {
  &:hover {
    transform: scale(1.1);
    color: #409eff;
  }
}

.el-header {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 80px;
    cursor: pointer;
  }

  .search-input {
    width: 850px;
    margin: 0 20px;
    display: flex;
    .el-input {
      min-width: 300px;
      max-width: 800px;
      .el-select {
        width: 110px;
      }
    }
  }

  .user {
    min-width: 350px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .user-head {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .user-message-text {
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
    }

    .join-vip-text {
      color: #ff3300;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        color: #ff3300e3;
        transform: scale(1.1);
      }
    }
  }
}

.user-info {
  .el-divider {
    margin: 15px 0;
  }

  .info-header {
    .nickname {
      font-size: 21px;
      color: black;
      text-align: center;
      margin: 5px 0 10px 0;
    }
    .vip {
      display: flex;
      justify-content: center;
      align-items: center;

      .vip-icon {
        height: 20px;
      }
    }
  }

  .info-overview {
    display: flex;
    justify-content: space-around;
    .overview {
      @include scale-text;
      cursor: pointer;

      p {
        text-align: center;
      }

      .overview-num {
        color: black;
        font-weight: bold;
        font-size: 21px;
      }

      .overview-text {
        color: #909399;
        margin-top: 5px;
      }
    }
  }

  .info-nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .nav {
      @include scale-text;
      display: flex;
      align-items: center;
      margin: 15px 0 0 20px;
      cursor: pointer;

      &:nth-of-type(1) {
        margin-top: 5px;
      }

      .nav-icon {
        width: 15px;
        height: 15px;
      }

      p {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }

  .logout {
    display: flex;
    .logout-container {
      @include scale-text;
      display: flex;
      align-items: center;
      cursor: pointer;

      .icon {
        font-size: 18px;
        margin: 3px 5px 0 20px;
      }

      p {
        font-size: 18px;
      }
    }
  }
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .el-badge {
    @include scale-text;
    padding: 3px 3px 0 0;
    margin: 15px 0 0 15px;

    &:nth-of-type(1) {
      margin-top: 10px;
    }

    .interact {
      font-size: 15px;
      display: flex;
      cursor: pointer;

      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
