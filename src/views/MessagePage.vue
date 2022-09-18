<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-21 15:53:15
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-28 14:27:13
 * @FilePath: \campus-grocery\src\views\MessagePage.vue
 * @Description: 用户消息界面
-->
<template>
  <el-main>
    <el-tabs
      tab-position="left"
      v-model="currentTab"
    >
      <el-tab-pane name="support">
        <p
          class="label"
          slot="label"
        >
          <span
            v-if="userInfo.unreadSupportNum > 0"
            class="red-dot"
          ></span>
          <span>点赞</span>
        </p>
        <!-- 使用vif是为了在每次切换tab时，刷新数据 -->
        <SupportMessageList v-if="currentTab === 'support'" />
      </el-tab-pane>

      <el-tab-pane name="comment">
        <p
          class="label"
          slot="label"
        >
          <span
            v-if="userInfo.unreadCommentNum > 0"
            class="red-dot"
          ></span>
          <span>评论</span>
        </p>
        <CommentMessageList v-if="currentTab === 'comment'" />
      </el-tab-pane>

      <el-tab-pane name="buy">
        <p
          class="label"
          slot="label"
        >
          <span
            v-if="userInfo.unreadBuyNum > 0"
            class="red-dot"
          ></span>
          <span>求购</span>
        </p>
        <BuyMessageList v-if="currentTab === 'buy'" />
      </el-tab-pane>

      <el-tab-pane name="system">
        <p
          class="label"
          slot="label"
        >
          <span
            v-if="userInfo.unreadSystemNum > 0"
            class="red-dot"
          ></span>
          <span>系统</span>
        </p>
        <SystemMessageList v-if="currentTab === 'system'" />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import SupportMessageList from '@/components/message/SupportMessageList.vue'
import CommentMessageList from '@/components/message/CommentMessageList.vue'
import BuyMessageList from '@/components/message/BuyMessageList.vue'
import SystemMessageList from '@/components/message/SystemMessageList.vue'
import { mapState } from 'vuex'

export default {
  name: 'MessagePage',

  components: { SupportMessageList, CommentMessageList, BuyMessageList, SystemMessageList },

  data() {
    return {
      currentTab: 'support',
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  created() {
    const tab = this.$route.query.tab
    if (tab) {
      this.currentTab = tab
    }
  },
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

    .label {
      position: relative;

      .red-dot {
        position: absolute;
        right: -6px;
        top: 6px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: red;
      }
    }
  }
}
</style>
