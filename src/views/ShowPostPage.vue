<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 19:41:00
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 21:42:33
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

    <div v-else>{{ postType }}---{{ id }}</div>
  </el-main>
</template>

<script>
export default {
  name: 'ShowPostPage',

  data() {
    return {
      notFound: false,
      postType: '',
      id: '',
    }
  },

  methods: {},

  created() {
    const { postType = '', id = '' } = this.$route.query
    const postTypeList = ['transaction', 'campus', 'lost', 'advert']
    if (postType.length === 0 || id.length === 0 || !postTypeList.includes(postType)) {
      this.notFound = true
    } else {
      ;[this.postType, this.id] = [postType, id]
      // alert('请求后端数据')
    }
  },
}
</script>

<style scoped lang="scss">
.el-main {
  .not-found {
    width: 100%;
    height: 100%;
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
