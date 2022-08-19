<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-09 22:12:06
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 17:09:04
 * @FilePath: \campus-grocery\src\components\home\AdvertBar.vue
 * @Description: 广告栏组件
-->
<template>
  <div
    class="advert-bar"
    v-loading="loading"
  >
    <el-carousel
      :interval="4000"
      type="card"
      trigger="click"
      height="225px"
    >
      <el-carousel-item
        v-for="advert in advertList"
        :key="advert.id"
      >
        <img
          :src="advert.mainImg"
          alt="advert"
          @click="toAdvertPost(advert.id)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getPostList } from '@/apis/getPost'
import resHandle from '@/utils/resHandle'

export default {
  name: 'AdvertBar',

  data() {
    return {
      loading: false,
      advertList: [],
    }
  },

  methods: {
    // 跳转至某个广告帖子
    toAdvertPost(advertID) {
      this.$router.push(`/showPost?postType=advert&id=${advertID}`)
    },

    // 获取失物招领帖子列表
    async getAdvertList(extraSuccessHandle = null) {
      this.loading = true

      const res = await getPostList({
        postType: 'advert',
        pageNum: 1,
        pageSize: 5,
        condition: { finished: 0 },
      })

      resHandle(res, {
        successHandle: () => {
          const {
            data: { postList },
          } = res

          this.advertList = postList.map(post => {
            const { id, mainImg } = post

            return {
              id,
              mainImg,
            }
          })

          extraSuccessHandle && extraSuccessHandle()
        },

        finallyHandle: () => {
          this.loading = false
        },
      })
    },
  },

  async created() {
    await this.getAdvertList()
  },
}
</script>

<style scoped lang="scss">
.advert-bar {
  width: 1200px;
  min-width: 1200px;
  height: 270px;
  min-height: 270px;
  border-radius: 10px;
  padding: 10px 0;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.11);
  box-shadow: 0px 0px 15px #00000071;

  .el-carousel {
    min-width: 1100px;
    min-height: 270px;
    margin: 0 20px;

    .el-carousel__item {
      img {
        width: 400px;
        height: 225px;
        border-radius: 5px;
        object-fit: cover;
      }
    }
  }
}
</style>
