<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-10 15:01:56
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 18:04:21
 * @FilePath: \campus-grocery\src\components\home\CampusBar.vue
 * @Description: 校园趣闻轶事栏组件
-->
<template>
  <div class="campus-bar">
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
export default {
  name: 'CampusBar',

  data() {
    return {
      campusList: [
        {
          id: '0',
          title: '邀请函：西安邮电大学计算机学院20周年庆',
        },
        {
          id: '1',
          title: '9月10日教师节联欢晚会于西区大学生活动中心举行',
        },
        {
          id: '2',
          title: '今天在东区北门发现了一只超好看的小猫咪',
        },
        {
          id: '3',
          title: '10月份孤儿院、敬老院“温暖行动”开始报名啦~',
        },
        {
          id: '4',
          title: '校园十大歌手大赛报名正式开始啦！',
        },
      ],
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
      alert(`前往校园趣闻轶事ID：${CampusID}`)
    },

    // 跳转至校园趣闻轶事帖页面
    toCampusPosts() {
      alert(`前往校园趣闻轶事页面`)
    },
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
