<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 19:41:00
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 18:41:17
 * @FilePath: \campus-grocery\src\views\ShowPostPage.vue
 * @Description: 查看帖子界面
-->
<template>
  <el-main>
    <div
      class="not-found"
      v-if="notFound"
    >
      <div class="text-container">
        <p class="text-container-title">对不起，您查看的帖子不存在，可能：</p>
        <p class="text-container-content">1.作者已经删除帖子；</p>
        <p class="text-container-content">2.帖子违规被管理员删除；</p>
      </div>
    </div>

    <template v-else>
      <TransactionShowPost
        v-if="postType === 'transaction'"
        :id="id"
        @notFound="notFoundHandle"
      />

      <AdvertShowPost
        v-else-if="postType === 'advert'"
        :id="id"
        @notFound="notFoundHandle"
      />

      <LostShowPost
        v-else-if="postType === 'lost'"
        :id="id"
        @notFound="notFoundHandle"
      />

      <CampusShowPost
        v-else-if="postType === 'campus'"
        :id="id"
        @notFound="notFoundHandle"
      />
    </template>
  </el-main>
</template>

<script>
import TransactionShowPost from '@/components/show-post/TransactionShowPost.vue'
import AdvertShowPost from '@/components/show-post/AdvertShowPost.vue'
import LostShowPost from '@/components/show-post/LostShowPost.vue'
import CampusShowPost from '@/components/show-post/CampusShowPost.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'ShowPostPage',

  components: { TransactionShowPost, AdvertShowPost, LostShowPost, CampusShowPost },

  data() {
    return {
      notFound: false,
      postType: '',
      id: '',
    }
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 帖子不存在的回调，由子组件触发
    notFoundHandle() {
      this.notFound = true
    },
  },

  created() {
    this.updateLoading({
      loading: true,
      loadingText: '帖子加载中...',
    })

    const { postType = '', id = -1 } = this.$route.query
    const postproductCategoryList = ['transaction', 'campus', 'lost', 'advert']
    if (postType.length === 0 || id === -1 || !postproductCategoryList.includes(postType)) {
      this.notFound = true

      this.updateLoading({
        loading: false,
      })
    } else {
      ;[this.postType, this.id] = [postType, Number(id)]
    }
  },
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .not-found {
    margin-top: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .text-container-title {
        font-size: 24px;
        font-weight: bold;
      }

      .text-container-content {
        margin-top: 10px;
      }
    }
  }
}
</style>
