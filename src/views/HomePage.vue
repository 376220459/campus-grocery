<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-07 22:12:15
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-15 18:12:40
 * @FilePath: \campus-grocery\src\views\HomePage.vue
 * @Description: 校园杂货铺首页
-->
<template>
  <el-main>
    <AdvertBar />
    <div class="main-container">
      <CampusBar />
      <LostBar />
      <TransactionBar />
    </div>
  </el-main>
</template>

<script>
import AdvertBar from '@/components/home/AdvertBar.vue'
import CampusBar from '@/components/home/CampusBar.vue'
import LostBar from '@/components/home/LostBar.vue'
import TransactionBar from '@/components/home/TransactionBar.vue'
export default {
  name: 'HomePage',

  components: { AdvertBar, CampusBar, LostBar, TransactionBar },
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
