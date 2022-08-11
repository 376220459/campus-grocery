<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-10 15:01:56
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-10 23:49:09
 * @FilePath: \campus-grocery\src\components\home\LostBar.vue
 * @Description: 失物招领栏组件
-->
<template>
  <div class="lost-bar">
    <div
      class="more-text"
      @click="toLostPosts"
    >
      {{ '>> 更多' }}
    </div>

    <img
      class="lost-text"
      src="@/assets/images/lost-text.png"
      alt="失物招领"
    />

    <el-carousel
      height="285px"
      direction="vertical"
      :interval="4000"
      trigger="click"
    >
      <el-carousel-item
        v-for="lost in lostList"
        :key="lost.id"
      >
        <el-tooltip
          effect="light"
          :content="lost.title"
          placement="top-start"
        >
          <p
            class="lost-title"
            @click="toLost(lost.id)"
          >
            <span class="title-nav">{{ '>>' }}</span>
            {{ lost.title }}
          </p>
        </el-tooltip>
        <img
          :src="lost.img"
          alt="advert"
          @click="toLost(lost.id)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'LostBar',

  data() {
    return {
      lostList: [
        {
          id: '0',
          title: '谁的钥匙丢在饭堂门口了，速来领取',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/lost/lost1.jpg',
        },
        {
          id: '1',
          title: '王尼玛，你的四级准考证落在西区图书馆啦',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/lost/lost2.jpg',
        },
        {
          id: '2',
          title: '东区教学楼捡到银行卡一张，携带证件来领取',
          img: 'http://rgcrk77pq.hb-bkt.clouddn.com/lost/lost3.jpg',
        },
      ],
    }
  },

  methods: {
    toLost(lostID) {
      alert(`前往失物招领ID：${lostID}`)
    },

    toLostPosts() {
      alert(`前往失物招领页面`)
    },
  },
}
</script>

<style scoped lang="scss">
.lost-bar {
  position: fixed;
  margin-top: 330px;
  margin-left: 1010px;
  width: 400px;
  min-width: 400px;
  height: 350px;
  padding: 5px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 15px #00000071;
  background: #d1e9cce1;

  .more-text {
    position: absolute;
    top: 3px;
    right: 5px;
    color: #409eff;
    z-index: 9999;
    cursor: pointer;

    &:hover {
      color: #0984ff;
    }
  }

  .lost-text {
    height: 80px;
  }

  .el-carousel {
    margin-top: -30px;
    .el-carousel__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 18px;
      cursor: pointer;

      .lost-title {
        width: 100%;
        color: #303133;
        text-align: left;
        font-weight: bold;
        padding-left: 25px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10px;

        .title-nav {
          color: #409eff;
          margin-right: 5px;
        }

        &:hover {
          color: #409eff;
        }
      }

      img {
        width: 350px;
        height: 225px;

        // 图片尺寸不符合时，局部放大，不压缩照片
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }
}

@media screen and (max-width: 1900px) {
  .lost-bar {
    display: none;
  }
}
</style>
