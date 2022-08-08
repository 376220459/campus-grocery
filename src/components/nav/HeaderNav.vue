<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-08 15:30:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 19:40:40
 * @FilePath: \campus-grocery\src\components\nav\HeaderNav.vue
 * @Description: 头部导航栏组件
-->
<template>
  <el-header height="50px">
    <img
      class="logo"
      src="@/assets/images/Grocery-Logo.png"
      alt="logo"
      @click="toHomePage"
    />
    <el-input
      placeholder="看看今天有什么校园大事件"
      v-model="searchInput"
      class="input-with-select"
      size="small"
    >
      <el-select
        v-model="selectValue"
        slot="prepend"
        size="small"
      >
        <el-option
          label="二手交易"
          value="transaction_posts"
        ></el-option>
        <el-option
          label="趣闻轶事"
          value="campus_posts"
        ></el-option>
        <el-option
          label="失物招领"
          value="lost_posts"
        ></el-option>
        <el-option
          label="广告推广"
          value="advert_posts"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        type="small"
      ></el-button>
    </el-input>

    <div class="user">
      <el-popover
        placement="bottom"
        width="200"
        trigger="click"
      >
        <img
          class="user-head"
          src="@/assets/images/Grocery-Logo.png"
          alt="headImg"
          slot="reference"
        />

        <div class="user-info">
          <div class="header-info">
            <p class="nickname">昵称</p>
            <div class="vip">
              <img
                src="@/assets/images/vip.png"
                alt="vip"
                width="25px"
                v-if="true"
              />
              <img
                src="@/assets/images/novip.png"
                alt="novip"
                width="25px"
                v-else
              />
              <p>VIP8</p>
            </div>
          </div>

          <el-divider></el-divider>

          <div>
            <div>信誉分</div>
            <div>获赞</div>
          </div>

          <el-divider></el-divider>

          <div>
            <p>个人中心</p>
            <p>账号信息</p>
            <p>我的发布</p>
            <p>我的互动</p>
          </div>

          <el-divider></el-divider>

          <div>退出</div>
        </div>
      </el-popover>

      <el-badge is-dot>
        <el-popover
          placement="bottom"
          width="80"
          trigger="hover"
        >
          <div
            slot="reference"
            class="user-message"
          >
            消息
          </div>

          <div>我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字</div>
        </el-popover>
      </el-badge>

      <el-badge is-dot>
        <el-popover
          placement="bottom"
          width="80"
          trigger="hover"
        >
          <div
            slot="reference"
            class="join-vip"
          >
            加入会员
          </div>

          <div>我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字</div>
        </el-popover>
      </el-badge>

      <el-button
        type="primary"
        size="small"
        >我要发布</el-button
      >
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'HeaderNav',

  data() {
    return {
      searchInput: '',
      selectValue: 'transaction_posts',
    }
  },

  methods: {
    toHomePage() {
      window.location.href = '/home'
    },
  },
}
</script>

<style scoped lang="scss">
@mixin point-text {
  &:hover {
    cursor: pointer;
    color: rgb(255, 0, 0);
  }
}
.el-header {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    cursor: pointer;
  }

  .el-input {
    min-width: 300px;
    max-width: 800px;
    margin: 0 20px;
    .el-select {
      width: 100px;
    }
  }

  .user {
    min-width: 300px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .user-head {
      width: 30px;
      height: 30px;
      border: 1px solid black;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        transform: scale(1.5);
        margin-top: 10px;
      }
    }
    .user-message,
    .join-vip {
      @include point-text;
    }
  }
}

.user-info {
  .header-info {
    .nickname {
      font-size: 30px;
      text-align: center;
      margin: 5px 0 10px 0;
    }
    .vip {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        margin-left: 5px;
      }
    }
  }
}
</style>
