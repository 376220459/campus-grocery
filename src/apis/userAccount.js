/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 15:54:49
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
    return {
      code: 0,
      error,
    }
  }
}

async function logout() {
  try {
    const res = await http.delete('/logout')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { checkAuthToken, logout }
