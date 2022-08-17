/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-17 20:53:05
 * @FilePath: \campus-grocery\src\apis\getPost.js
 * @Description: 获取帖子（帖子列表）相关接口
 */
import http from './http'

// 验证用户登录token接口
async function getPostList(payload) {
  try {
    const res = await http.post('/getPostList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { getPostList }
