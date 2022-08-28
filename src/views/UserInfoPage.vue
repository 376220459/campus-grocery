<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-28 14:55:56
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-28 18:11:52
 * @FilePath: \campus-grocery\src\views\UserInfoPage.vue
 * @Description: 用户个人信息界面
-->
<template>
  <el-main>
    <div class="user-info-container">
      <div class="info-container">
        <el-descriptions
          class="info"
          title="个人信息"
          :column="2"
          border
        >
          <template slot="extra">
            <el-button
              v-if="currentState === 'view'"
              type="primary"
              size="small"
              @click="handleInfo"
              >编辑</el-button
            >

            <el-button
              v-else
              type="success"
              size="small"
              @click="saveInfo"
              >保存</el-button
            >
          </template>

          <el-descriptions-item :span="2">
            <template slot="label">
              <i class="el-icon-user"></i>
              头像
            </template>
            <img
              class="head"
              :src="userInfoAlias.head"
            />
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              昵称
            </template>
            <template v-if="currentState === 'view'">{{ userInfoAlias.nickname }}</template>
            <el-input
              v-else
              ref="nickname"
              v-model="userInfoAlias.nickname"
              :maxlength="8"
              show-word-limit
            ></el-input>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              手机号
            </template>
            {{ userInfoAlias.telNumber }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              信誉度
            </template>
            {{ userInfoAlias.credit }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              乐豆
            </template>
            {{ userInfoAlias.ledou }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              会员等级
            </template>
            {{ userInfoAlias.vip }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              年龄
            </template>
            <template v-if="currentState === 'view'">{{ userInfoAlias.age }}</template>
            <el-input
              v-else
              :value="userInfoAlias.age"
              :maxlength="2"
              show-word-limit
              @input="inputAge"
            ></el-input>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              性别
            </template>
            <template v-if="currentState === 'view'">{{ userInfoAlias.sex | sexFilter }}</template>
            <el-select
              v-else
              v-model="userInfoAlias.sex"
              placeholder="请选择"
            >
              <el-option
                label="男"
                value="male"
              >
              </el-option>

              <el-option
                label="女"
                value="female"
              >
              </el-option>
            </el-select>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              生日
            </template>
            <template v-if="currentState === 'view'">{{ userInfoAlias.birthday }}</template>
            <el-date-picker
              v-else
              v-model="userInfoAlias.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-descriptions-item>

          <el-descriptions-item :span="2">
            <template slot="label">
              <i class="el-icon-user"></i>
              个性签名
            </template>
            <template v-if="currentState === 'view'">{{ userInfoAlias.signature }}</template>
            <el-input
              v-else
              v-model="userInfoAlias.signature"
              :maxlength="50"
              show-word-limit
            ></el-input>
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions
          title="校园信息"
          :column="1"
          border
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-school"></i>
              学校
            </template>
            {{ userInfoAlias.school }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ userInfoAlias.name }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-custom"></i>
              身份
            </template>
            {{ userInfoAlias.identity | identityFilter }}
          </el-descriptions-item>

          <el-descriptions-item v-if="userInfoAlias.identity === 'student'">
            <template slot="label">
              <i class="el-icon-c-scale-to-original"></i>
              学号
            </template>
            {{ userInfoAlias.studentNumber }}
          </el-descriptions-item>

          <el-descriptions-item v-else>
            <template slot="label">
              <i class="el-icon-c-scale-to-original"></i>
              工号
            </template>
            {{ userInfoAlias.jobNumber }}
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
  name: 'UserInfoPage',

  data() {
    return {
      currentState: 'view',
      userInfoAlias: {
        nickname: '',
        telNumber: '',
        school: '',
        name: '',
        identity: '',
        studentNumber: '',
        jobNumber: '',
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  filters: {
    // 性别过滤
    sexFilter(sex) {
      const sexDict = {
        male: '男',
        female: '女',
      }
      return sexDict[sex]
    },

    // 身份过滤
    identityFilter(identity) {
      const identityDict = {
        student: '学生',
        teacher: '老师',
      }
      return identityDict[identity]
    },
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

    // 编辑个人信息
    handleInfo() {
      this.currentState = 'handle'
    },

    // 保存个人信息
    saveInfo() {
      if (this.userInfoAlias.nickname.length === 0) {
        this.$message.warning('昵称为必填项')
        this.$refs.nickname.focus()
      } else {
        this.$message.success('保存成功')
        this.currentState = 'view'
      }
    },

    // 年龄输入限制
    inputAge(v) {
      const regexp = /^\d?\d?$/
      if (regexp.test(v)) {
        this.userInfoAlias.age = v
      }
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

  .user-info-container {
    width: 1100px;
    min-width: 1100px;
    height: 100%;
    background: white;
    padding: 30px;
    border-radius: 10px;
    overflow: auto;

    .info {
      margin-bottom: 50px;

      .head {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>
