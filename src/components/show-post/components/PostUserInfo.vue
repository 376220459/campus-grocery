<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-19 16:01:54
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 18:22:13
 * @FilePath: \campus-grocery\src\components\show-post\components\PostUserInfo.vue
 * @Description: 帖子发布者基本信息组件
-->
<template>
  <div class="user-info">
    <img
      :src="head"
      class="head"
    />
    <div class="info">
      <div class="nickname-container">
        <p class="nickname">{{ nickname }}</p>
        <img
          :src="vipList[`vip${vip}`]"
          class="vip"
        />
      </div>
      <p class="signature">{{ signature ? signature : '这个人很懒，什么都没有留下' }}</p>
    </div>
  </div>
</template>

<script>
import vip1 from '@/assets/images/vip1.png'
import vip2 from '@/assets/images/vip2.png'
import vip3 from '@/assets/images/vip3.png'
import vip4 from '@/assets/images/vip4.png'
import vip5 from '@/assets/images/vip5.png'
import vip6 from '@/assets/images/vip6.png'
import { getUserInfo } from '@/apis/userInfo'
import resHandle from '@/utils/resHandle'

export default {
  name: 'PostUserInfo',

  props: {
    telNumber: {
      type: [String, Number],
      required: true,
    },
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
      head: '',
      nickname: '',
      vip: '',
      signature: '',
    }
  },

  methods: {},

  async created() {
    const res = await getUserInfo({ telNumber: this.telNumber })
    resHandle(res, {
      successHandle: () => {
        const { head, nickname, vip, signature } = res.data
        ;[this.head, this.nickname, this.vip, this.signature] = [head, nickname, vip, signature]
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
</style>
