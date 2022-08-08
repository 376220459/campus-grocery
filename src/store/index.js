/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 15:15:04
 * @FilePath: \campus-grocery\src\store\index.js
 * @Description: vuex入口文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
})
