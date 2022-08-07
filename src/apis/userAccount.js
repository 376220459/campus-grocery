/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 22:55:40
 * @FilePath: \campus-grocery\src\apis\userAccount.js
 * @Description: 用户账号相关接口
 */
import http from './http'

// 验证用户登录token接口
async function checkAuthToken() {
  try {
    const res = await http.get('/checkAuthToken')
    return res.data
  } catch (error) {
    // 返回{ code: 0 }是为了触发请求失败的回调
    return { code: 0 }
  }
}

export { checkAuthToken }
