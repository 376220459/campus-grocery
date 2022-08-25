<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-10 15:01:56
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 22:32:11
 * @FilePath: \campus-grocery\src\components\home\CampusBar.vue
 * @Description: 校园趣闻轶事栏组件
-->
<template>
  <div
    class="campus-bar"
    v-loading="loading"
  >
    <div
      class="more-text"
      @click="toCampusPosts"
    >
      {{ '>> 更多' }}
    </div>

    <img
      class="campus-text"
      src="@/assets/images/campus-text.png"
      alt="校园大事件"
    />

    <ul>
      <li
        v-for="campus in campusList"
        :key="campus.id"
        @click="toCampusPost(campus.id)"
      >
        <span class="title-nav">{{ '>>' }}</span>
        <p class="title">{{ campus.title }}</p>
      </li>
    </ul>

    <p class="today">{{ today }}</p>
  </div>
</template>

<script>
import { getPostList } from '@/apis/getPost'
import resHandle from '@/utils/resHandle'

export default {
  name: 'CampusBar',

  data() {
    return {
      loading: false,
      campusList: [],
    }
  },

  computed: {
    today() {
      const now = new Date()
      const [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
      return `${year}/${month}/${date}`
    },
  },

  methods: {
    // 跳转至某个校园趣闻轶事帖子
    toCampusPost(CampusID) {
      this.$router.push(`/showPost?postType=campus&id=${CampusID}`)
    },

    // 跳转至校园趣闻轶事帖页面
    toCampusPosts() {
      this.$router.push('/showPostList?postType=campus')
    },

    // 获取校园趣闻轶事帖子列表
    async getCampusList(extraSuccessHandle = null) {
      this.loading = true
      const res = await getPostList({
        postType: 'campus',
        pageNum: 1,
        pageSize: 5,
      })

      resHandle(res, {
        successHandle: () => {
          const {
            data: { postList },
          } = res

          this.campusList = postList.map(post => {
            const { id, title } = post

            return {
              id,
              title,
            }
          })

          extraSuccessHandle && extraSuccessHandle()
        },

        finallyHandle: () => {
          this.loading = false
        },
      })
    },
  },

  async created() {
    await this.getCampusList()
  },
}
</script>

<style scoped lang="scss">
.campus-bar {
  position: fixed;
  margin-left: 1210px;
  width: 400px;
  min-width: 400px;
  height: 300px;
  min-height: 300px;
  padding: 5px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 15px #00000071;
  background-color: rgba(255, 255, 255, 0.11);
  display: flex;
  flex-direction: column;
  align-items: center;

  .more-text {
    position: absolute;
    top: 3px;
    right: 5px;
    color: #409eff;
    z-index: 9999;
    cursor: pointer;

    &:hover {
      color: #0984ff;
    }
  }

  .campus-text {
    margin-top: 5px;
    height: 60px;
  }

  ul {
    width: 350px;

    li {
      font-size: 18px;
      margin: 15px 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      .title-nav {
        color: #409eff;
        margin-right: 5px;
      }

      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &:hover {
          color: #409eff;
        }
      }
    }
  }

  .today {
    position: absolute;
    bottom: 3px;
    right: 10px;
    color: #909399;
  }
}

@media screen and (max-width: 1900px) {
  .campus-bar {
    display: none;
  }
}
</style>
