/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-09 21:18:10
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
    // 返回{ code: -1 }，表示用户手动取消加载
    return { code: -1 }
  }
}

export { checkAuthToken }
