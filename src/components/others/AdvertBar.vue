<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-09 22:12:06
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-09 22:58:06
 * @FilePath: \campus-grocery\src\components\others\AdvertBar.vue
 * @Description: 广告栏组件
-->
<template>
  <el-carousel
    :interval="4000"
    type="card"
    trigger="click"
    height="225px"
  >
    <el-carousel-item
      v-for="(url, index) in advertList"
      :key="index"
    >
      <img
        :src="url"
        alt="advert"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'AdvertBar',

  data() {
    return {
      advertList: [
        'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert1.jpg',
        'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert2.jpg',
        'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert3.jpg',
        'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert4.jpg',
        'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert5.jpg',
      ],
    }
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.el-carousel {
  min-width: 800px;
  .el-carousel__item {
    img {
      width: 400px;
      height: 225px;
      border-radius: 5px;
    }
  }
}
</style>
