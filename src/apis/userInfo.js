/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-09-17 19:41:43
 * @FilePath: \campus-grocery\src\apis\userInfo.js
 * @Description: 用户信息相关接口
 */
import http from './http'

// 获取用户信息接口
async function getUserInfo(payload) {
  try {
    const res = await http.post('/getUserInfo', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 设置用户信息接口
async function setUserInfo(payload) {
  try {
    const res = await http.post('/setUserInfo', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { getUserInfo, setUserInfo }
