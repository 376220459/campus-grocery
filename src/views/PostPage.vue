<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 19:41:00
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-15 14:43:52
 * @FilePath: \campus-grocery\src\views\PostPage.vue
 * @Description: 发布帖子界面
-->
<template>
  <el-main>
    <el-tabs v-model="postType">
      <el-tab-pane name="transaction">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          二手交易
        </span>

        <TransactionPostForm />
      </el-tab-pane>

      <el-tab-pane name="campus">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          校园趣闻轶事
        </span>

        <CampusPostForm />
      </el-tab-pane>

      <el-tab-pane name="lost">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          失物招领
        </span>

        <LostPostForm />
      </el-tab-pane>

      <el-tab-pane name="advert">
        <span slot="label">
          <i class="el-icon-edit-outline"></i>
          广告
        </span>

        <AdvertPostForm />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import TransactionPostForm from '@/components/post/TransactionPostForm.vue'
import CampusPostForm from '@/components/post/CampusPostForm.vue'
import LostPostForm from '@/components/post/LostPostFormAlias.vue'
import AdvertPostForm from '@/components/post/AdvertPostForm.vue'
import getUploadTokenHandle from '@/utils/getUploadTokenHandle'
import resHandle from '@/utils/resHandle'
resHandle

export default {
  name: 'PostPage',

  components: { TransactionPostForm, CampusPostForm, LostPostForm, AdvertPostForm },

  data() {
    return {
      postType: 'transaction',
    }
  },

  // 进入发布界面前，获取uploadToken
  async beforeRouteEnter(to, from, next) {
    await getUploadTokenHandle()
    next()
  },
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-tabs {
    width: 1100px;
    min-width: 1100px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
  }
}
</style>
