/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 23:00:12
 * @FilePath: \campus-grocery\src\router\index.js
 * @Description: 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ErrorPage from '../views/ErrorPage.vue'
import HomePage from '../views/HomePage.vue'
import VueCookies from 'vue-cookies'
import { checkAuthToken } from '@/apis/userAccount'

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

router.beforeEach(async (to, from, next) => {
  const authToken = VueCookies.get('auth_token')
  if (!authToken) {
    window.location = `${process.env.VUE_APP_LOGIN}?redirect=${window.location.href}`
  } else {
    const res = await checkAuthToken()
    alert(JSON.stringify(res))
  }
  next()
})

export default router
