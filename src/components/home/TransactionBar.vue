<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-10 20:50:59
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 19:38:59
 * @FilePath: \campus-grocery\src\components\home\TransactionBar.vue
 * @Description: 二手交易组件
-->
<template>
  <div class="transaction-bar">
    <div class="type-list">
      <p class="type-text">分类:</p>

      <p
        v-for="(type, index) in typeList"
        :key="index"
        :class="{ 'select-type': isSelect(type) }"
        @click="selectType(type)"
      >
        {{ type }}
      </p>
    </div>

    <el-divider></el-divider>

    <div
      class="goods-container"
      v-loading="goodsLoading"
      element-loading-text="加载中..."
    >
      <div
        class="goods"
        v-for="goods in goodsList"
        :key="goods.id"
        @click="toGoodsPost(goods.id)"
      >
        <img
          :src="goods.img"
          :alt="goods.id"
        />

        <div class="goods-content">
          <p class="goods-title">
            <span class="goods-title-text">标</span>
            <el-tooltip
              :content="goods.title"
              placement="top-start"
              effect="light"
            >
              <span>{{ goods.title }}</span>
            </el-tooltip>
          </p>
          <p class="goods-browse-count">{{ goods.browseCount }}人看过</p>
          <p class="goods-price">
            <span class="goods-price-text">￥</span>
            {{ goods.price }}
          </p>
        </div>
      </div>
    </div>

    <el-pagination
      :page-size="15"
      :total="currentTypeGoodsNum"
      layout="prev, pager, next"
      :pager-count="11"
      ref="test"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TransactionBar',

  data() {
    return {
      selectedType: '全部',
      typeList: ['全部', '书籍资料', '日常用品', '电子设备', '体育用品', '其它'],
      goodsLoading: false,
      currentPage: 1,
      currentTypeGoodsNum: 999,
      goodsList: [
        {
          id: '0',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '1',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '2',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '3',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '4',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '5',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '6',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '7',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '8',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '9',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '10',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '11',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '12',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '13',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
        {
          id: '14',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14063517486%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662795767&t=9d0d99665abb17ed8026f38a6feb115e',
          title: 'iphone13 pro max（256G 远峰蓝）用了一年，低价出了，急！！！',
          browseCount: '98',
          price: '3999',
        },
      ],
    }
  },

  methods: {
    selectType(type) {
      this.selectedType = type
      this.goodsLoading = true
      setTimeout(() => {
        this.goodsLoading = false
        this.currentPage = 1
        alert(`切换到了${type}`)
      }, 1000)
    },

    isSelect(type) {
      return type === this.selectedType
    },

    // 跳转至某个二手宝贝帖子
    toGoodsPost(goodsID) {
      alert(`前往二手宝贝ID：${goodsID}`)
    },

    toPage(pageNum) {
      this.goodsLoading = true
      setTimeout(() => {
        this.goodsLoading = false
        alert(`切换到${this.selectedType}的第${pageNum}页`)
      }, 1000)
    },
  },
}
</script>

<style scoped lang="scss">
.transaction-bar {
  width: 1200px;
  min-width: 1200px;
  border-radius: 10px;
  padding: 10px 0;
  background-color: white;

  .type-list {
    display: flex;
    align-items: center;
    margin: 10px 0;

    p {
      margin-left: 20px;
      cursor: pointer;

      &:nth-of-type(1) {
        margin-left: 30px;
      }

      &:hover {
        color: orange;
      }
    }

    .type-text {
      color: black;
      font-size: 1.2em;
      font-weight: bold;
      cursor: auto;

      &:hover {
        color: black;
      }
    }

    .select-type {
      color: orange;
      font-size: 1.1em;
    }
  }

  .goods-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .goods {
      width: 360px;
      height: 170px;
      background: #f7f9fa;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border: 1px solid #d64400;
      }

      img {
        width: 150px;
        height: 150px;
        border-radius: 5px;
        object-fit: cover;
        margin-right: 10px;
      }

      .goods-content {
        height: 140px;
        width: 170px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .goods-title {
          height: 2.6em;
          line-height: 1.3em;
          width: 175px;
          text-align: left;
          overflow: hidden;
          word-break: break-all;

          .goods-title-text {
            color: white;
            background-color: orange;
            padding: 2px;
            border-radius: 3px;
            margin-right: 5px;
          }

          &:hover {
            color: #ff5000;
          }
        }

        .goods-browse-count {
          font-size: 15px;
          color: #909399;
          margin: 15px 0 30px 5px;
        }

        .goods-price {
          font-size: 24px;
          color: #ff5000;

          .goods-price-text {
            font-size: 15px;
            font-weight: normal;
          }
        }
      }
    }
  }

  .el-pagination {
    margin-top: 10px;
  }
}
</style>
