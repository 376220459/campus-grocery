<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-10 20:50:59
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-10 23:43:30
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
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
      <div class="goods">二手宝贝</div>
    </div>

    <el-pagination
      :page-size="9"
      :pager-count="11"
      layout="prev, pager, next"
      :total="10"
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
    }
  },

  methods: {
    selectType(type) {
      this.selectedType = type
      this.goodsLoading = true
      setTimeout(() => {
        this.goodsLoading = false
      }, 1000)
    },

    isSelect(type) {
      return type === this.selectedType
    },
  },
}
</script>

<style scoped lang="scss">
.transaction-bar {
  width: 1000px;
  min-width: 1000px;
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
      width: 300px;
      height: 300px;
      background: #f7f9fa;
      border-radius: 5px;
      margin: 10px;
      cursor: pointer;
    }
  }

  .el-pagination {
    margin-top: 10px;
  }
}
</style>
