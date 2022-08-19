<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-10 20:50:59
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 00:26:11
 * @FilePath: \campus-grocery\src\components\home\TransactionBar.vue
 * @Description: 二手交易组件
-->
<template>
  <div class="transaction-bar">
    <div class="type-list">
      <p class="type-text">分类:</p>

      <p
        v-for="(type, index) in productCategoryList"
        :key="index"
        :class="{ 'select-type': isSelect(type) }"
        @click="selectType(type)"
      >
        {{ type }}
      </p>
    </div>

    <el-divider></el-divider>

    <div
      class="product-container"
      v-loading="productLoading"
      element-loading-text="加载中..."
    >
      <div
        class="product"
        v-for="product in productList"
        :key="product.id"
        @click="toProductPost(product.id)"
      >
        <img :src="product.mainImg" />

        <div class="product-content">
          <p class="product-title">
            <span class="product-title-text">标</span>
            <el-tooltip
              :content="String(product.title)"
              placement="top-start"
              effect="light"
            >
              <span>{{ product.title }}</span>
            </el-tooltip>
          </p>
          <p class="product-browse-count">{{ product.browseCount }}人看过</p>
          <p class="product-price">
            <span class="product-price-text">￥</span>
            {{ product.price }}
          </p>
        </div>
      </div>
    </div>

    <el-pagination
      :page-size="pageSize"
      :total="currentTypeProductNum"
      layout="prev, pager, next"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @current-change="toPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getPostList } from '@/apis/getPost'
import resHandle from '@/utils/resHandle'

export default {
  name: 'TransactionBar',

  data() {
    return {
      selectedProductCategory: '全部',
      productCategoryList: ['全部', '书籍资料', '日常用品', '电子设备', '体育用品', '其它'],
      productLoading: false,
      pagerCount: 9,
      currentPage: 1,
      pageSize: 15,
      currentTypeProductNum: 999,
      productList: [],
    }
  },

  methods: {
    // 切换商品类型
    async selectType(type) {
      this.selectedProductCategory = type
      await this.getTransactionList(() => {
        this.currentPage = 1
      })
    },

    // 判断当前商品类型
    isSelect(type) {
      return type === this.selectedProductCategory
    },

    // 跳转至某个二手宝贝帖子
    toProductPost(productID) {
      this.$router.push(`/showPost?postType=transaction&id=${productID}`)
    },

    // 跳转页
    async toPage() {
      await this.getTransactionList()
    },

    // 获取二手交易帖子列表
    async getTransactionList(extraSuccessHandle = null) {
      this.productLoading = true

      const { selectedProductCategory, currentPage, pageSize } = this
      let condition = {}
      if (selectedProductCategory === '全部') {
        condition = { finished: 0 }
      } else {
        condition = { productCategory: selectedProductCategory, finished: 0 }
      }
      const res = await getPostList({
        postType: 'transaction',
        pageNum: currentPage,
        pageSize,
        condition,
      })

      resHandle(res, {
        successHandle: () => {
          const {
            data: { count, postList },
          } = res

          this.currentTypeProductNum = count
          this.productList = postList.map(post => {
            const { id, mainImg, title, browseCount, price } = post

            return {
              id,
              mainImg,
              title,
              browseCount,
              price,
            }
          })

          extraSuccessHandle && extraSuccessHandle()
        },

        finallyHandle: () => {
          this.productLoading = false
        },
      })
    },
  },

  async created() {
    await this.getTransactionList()
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

  .product-container {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px;

    .product {
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

      .product-content {
        height: 140px;
        width: 170px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .product-title {
          height: 2.6em;
          line-height: 1.3em;
          width: 175px;
          text-align: left;
          overflow: hidden;
          word-break: break-all;

          .product-title-text {
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

        .product-browse-count {
          font-size: 15px;
          color: #909399;
          margin: 15px 0 30px 5px;
        }

        .product-price {
          font-size: 18px;
          color: #ff5000;
          font-weight: bold;

          .product-price-text {
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
