<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-28 14:55:56
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-28 16:15:00
 * @FilePath: \campus-grocery\src\views\UserAccountPage.vue
 * @Description: 用户账号信息界面
-->
<template>
  <el-main>
    <div class="user-account-container">
      <div class="account-container">
        <el-descriptions
          class="account"
          title="账号信息"
          :column="1"
          border
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              昵称
            </template>
            {{ userInfoAlias.nickname }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机
            </template>
            {{ userInfoAlias.telNumber }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-lock"></i>
              密码
            </template>
            <el-button
              type="warning"
              size="mini"
              @click="toSetNewPasswordPage"
            >
              修改密码
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </el-main>
</template>

<script>
import { getUserInfo } from '@/apis/userInfo'
import { mapState } from 'vuex'
import resHandle from '@/utils/resHandle'

export default {
  name: 'UserAccountPage',

  data() {
    return {
      userInfoAlias: {
        nickname: '',
        telNumber: '',
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    // 获取个人信息
    async getUserInfo() {
      const res = await getUserInfo({ telNumber: this.userInfo.telNumber })
      resHandle(res, {
        successHandle: () => {
          this.userInfoAlias = res.data.userInfo
        },
      })
    },

    // 前往修改密码界面
    toSetNewPasswordPage() {
      window.location.href = `${process.env.VUE_APP_SSO_DOMAIN}forget`
    },
  },
  async created() {
    await this.getUserInfo()
  },
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-account-container {
    width: 1100px;
    min-width: 1100px;
    height: 100%;
    background: white;
    padding: 30px;
    border-radius: 10px;
    overflow: auto;
  }
}
</style>
