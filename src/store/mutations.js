/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-08 15:14:38
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 15:20:28
 * @FilePath: \campus-grocery\src\store\mutations.js
 * @Description: mutations模块
 */
export default {
  updateLoading(state, { loading, loadingText = state.loadingText }) {
    ;[state.loading, state.loadingText] = [loading, loadingText]
  },
}
