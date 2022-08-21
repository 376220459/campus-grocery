/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-08 15:14:38
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-21 23:03:11
 * @FilePath: \campus-grocery\src\store\mutations.js
 * @Description: mutations模块
 */
export default {
  // 控制全局Loading
  updateLoading(state, { loading, loadingText = state.loadingText }) {
    ;[state.loading, state.loadingText] = [loading, loadingText]
  },

  // 设置uploadToken
  setUploadToken(state, { uploadToken = '' }) {
    state.uploadToken = uploadToken
  },

  // 设置userInfo
  updateUserInfo(state, payload) {
    state.userInfo = {
      ...state.userInfo,
      ...payload,
    }
  },
}
