<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-09 22:12:06
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 18:07:33
 * @FilePath: \campus-grocery\src\components\home\AdvertBar.vue
 * @Description: 广告栏组件
-->
<template>
  <div class="advert-bar">
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
          :src="advert.img"
          alt="advert"
          @click="toAdvertPost(advert.id)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'AdvertBar',

  data() {
    return {
      advertList: [
        {
          id: '0',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert1.jpg',
        },
        {
          id: '1',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert2.jpg',
        },
        {
          id: '2',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert3.jpg',
        },
        {
          id: '3',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert4.jpg',
        },
        {
          id: '4',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/advert/advert5.jpg',
        },
      ],
    }
  },

  methods: {
    // 跳转至某个广告帖子
    toAdvertPost(advertID) {
      alert(`前往广告ID：${advertID}`)
    },
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
      }
    }
  }
}
</style>
