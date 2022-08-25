/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 21:42:13
 * @FilePath: \campus-grocery\src\apis\handlePostList.js
 * @Description: 帖子列表相关接口
 */
import http from './http'

// 获取帖子列表接口
async function getPostList2(payload) {
  try {
    const res = await http.post('/getPostList2', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取帖子列表总数接口
async function getPostListNum(payload) {
  try {
    const res = await http.post('/getPostListNum', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { getPostList2, getPostListNum }
