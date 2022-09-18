<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 15:53:15
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 18:29:45
 * @FilePath: \campus-grocery\src\views\UserInteractPage.vue
 * @Description: 用户互动界面
-->
<template>
  <el-main>
    <el-tabs
      tab-position="left"
      v-model="currentTab"
    >
      <el-tab-pane
        name="support"
        label="我的点赞"
      >
        <!-- 使用vif是为了在每次切换tab时，刷新数据 -->
        <UserSupportList v-if="currentTab === 'support'" />
      </el-tab-pane>

      <el-tab-pane
        name="comment"
        label="我的评论"
      >
        <UserCommentList v-if="currentTab === 'comment'" />
      </el-tab-pane>

      <el-tab-pane
        name="buy"
        label="我的求购"
      >
        <UserBuyList v-if="currentTab === 'buy'" />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import UserSupportList from '@/components/user-interact/UserSupportList.vue'
import UserCommentList from '@/components/user-interact/UserCommentList.vue'
import UserBuyList from '@/components/user-interact/UserBuyList.vue'

export default {
  name: 'UserInteractPage',

  components: { UserSupportList, UserBuyList, UserCommentList },

  data() {
    return {
      currentTab: 'support',
    }
  },

  computed: {},

  created() {},
}
</script>

<style lang="scss">
.el-tabs__content {
  flex-grow: 1;
  .el-tab-pane {
    height: 100%;
  }
}
</style>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-tabs {
    width: 1100px;
    min-width: 1100px;
    height: 100%;
    background: white;
    padding: 30px;
    border-radius: 10px;
    display: flex;
  }
}
</style>
