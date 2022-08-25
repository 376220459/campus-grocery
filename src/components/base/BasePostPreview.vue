<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-25 19:07:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 22:33:07
 * @FilePath: \campus-grocery\src\components\base\BasePostPreview.vue
 * @Description: 帖子预览组件（主要用于帖子列表界面）
-->
<template>
  <div
    class="base-post-preview"
    @click="toPost"
  >
    <header class="title">
      <span class="product-title-text">标</span>
      {{ postData.title }}
    </header>
    <main class="main">
      <div
        class="img"
        v-if="postData.img"
      >
        <img :src="postData.img" />
      </div>
      <div class="main-right">
        <p class="content">{{ postData.content }}</p>

        <footer class="main-footer">
          <div class="support">
            <i class="iconfont icon-dianzan" />
            <span>{{ postData.supportNum }} 赞</span>
          </div>

          <div class="comment">
            <i class="iconfont icon-pinglun" />
            <span>{{ postData.commentNum }} 评论</span>
          </div>

          <p class="nickname">{{ postData.nickname }}</p>

          <i
            class="el-icon-more extend"
            @click.stop="notOpen"
          />
        </footer>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BasePostPreview',

  props: {
    postData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    // 未开通功能提示
    notOpen() {
      this.$message.warning('此功能未开通')
    },

    toPost() {
      this.$router.push(`/showPost?postType=${this.postData.postType}&id=${this.postData.id}`)
    },
  },
}
</script>

<style scoped lang="scss">
.base-post-preview {
  width: 98%;
  height: 210px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    border: 1px solid #dcdfe6;
    border-radius: 10px;
  }

  .title {
    text-align: left;
    font-size: 21px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .product-title-text {
      font-size: 18px;
      color: white;
      font-weight: bold;
      background-color: orange;
      padding: 1px 4px;
      border-radius: 3px;
      margin-right: 5px;
    }
  }

  .main {
    flex-grow: 1;
    display: flex;
    align-items: center;

    .img {
      width: 180px;
      height: 130px;
      margin-right: 30px;

      img {
        width: 180px;
        height: 130px;
        object-fit: cover;
        border: 1px solid #ebeef5;
        border-radius: 10px;
      }
    }

    .main-right {
      height: 130px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .content {
        height: 85px;
        overflow: hidden;
        text-align: left;
        color: #909399;
        white-space: pre-wrap;
      }

      .main-footer {
        display: flex;
        align-items: flex-end;
        font-size: 15px;

        i {
          font-size: 21px;
          margin-right: 5px;
        }

        .support,
        .comment {
          margin-right: 20px;
          color: #606266;
        }

        .nickname {
          font-size: 18px;
          margin-right: 20px;
          cursor: pointer;

          &:hover {
            color: rgba(0, 0, 0, 0.555);
          }
        }

        .extend {
          font-size: 21px;
          color: #606266;
          align-self: flex-end;
          cursor: pointer;

          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
