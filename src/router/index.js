/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 15:02:15
 * @FilePath: \campus-grocery\src\router\index.js
 * @Description: 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ErrorPage from '../views/ErrorPage.vue'
import HomePage from '../views/HomePage.vue'
import VueCookies from 'vue-cookies'
import { checkAuthToken } from '@/apis/userAccount'
import resHandle from '@/utils/resHandle'
import { Message } from 'element-ui'

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
  setTimeout(() => {
    const loginURL = `${process.env.VUE_APP_LOGIN}?redirect=${window.location.href}`
    window.location.href = loginURL
  }, 2000)
}

// 因为本系统所有页面均需要登录才可以查看，所以设置全局路由的登录状态验证
router.beforeEach(async (to, from, next) => {
  const authToken = VueCookies.get('auth_token')
  if (!authToken) {
    Message.warning('您还没有登录，请先登录')
    toLoginPage()
  } else {
    const res = await checkAuthToken()
    resHandle(res, {
      successHandle: () => {
        next()
      },
      warningHandle: () => {
        toLoginPage()
      },
      errorHandle: () => {
        toLoginPage()
      },
    })
  }
})

export default router
