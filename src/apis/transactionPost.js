/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 03:20:19
 * @FilePath: \campus-grocery\src\apis\transactionPost.js
 * @Description: 二手交易帖子相关接口
 */
import http from './http'

// 验证用户登录token接口
async function postTransaction(payload) {
  try {
    const res = await http.post('/postTransaction', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { postTransaction }
