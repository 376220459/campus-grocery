/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-21 22:55:49
 * @FilePath: \campus-grocery\src\router\index.js
 * @Description: 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import { checkAuthToken } from '@/apis/userAccount'
import resHandle from '@/utils/resHandle'
import store from '@/store'
import { Message } from 'element-ui'

import ErrorPage from '../views/ErrorPage.vue'
import HomePage from '../views/HomePage.vue'
import PostPage from '../views/PostPage.vue'
import ShowPostPage from '../views/ShowPostPage.vue'
import MessagePage from '../views/MessagePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'error',
    component: ErrorPage,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/post',
    name: 'post',
    component: PostPage,
  },
  {
    path: '/showPost',
    name: 'showPost',
    component: ShowPostPage,
  },
  {
    path: '/message',
    name: 'message',
    component: MessagePage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 封装跳转登录页面函数
function toLoginPage() {
  // 跳转前先删除旧的登录token
  VueCookies.remove('auth_token')

  // 延迟跳转,给用户足够的时间看提示信息
  store.commit('updateLoading', {
    loading: true,
    loadingText: '正在跳转至登录界面...',
  })

  setTimeout(() => {
    store.commit('updateLoading', {
      loading: false,
      loadingText: '',
    })

    const loginURL = `${process.env.VUE_APP_LOGIN}?redirect=${window.location.href}`
    window.location.href = loginURL
  }, 3000)
}

// 因为本系统所有页面均需要登录才可以查看，所以设置全局路由的登录状态验证
router.beforeEach(async (to, from, next) => {
  const authToken = VueCookies.get('auth_token')
  if (!authToken) {
    Message.warning(`您还没有登录，请先登录`)
    toLoginPage()
  } else {
    const res = await checkAuthToken()
    resHandle(res, {
      successHandle: () => {
        // 将用户信息存入store
        store.commit('updateUserInfo', res.data.userInfo)
        next()
      },
      warningHandle: () => {
        toLoginPage()
      },
    })
  }
})

export default router
