/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 19:40:18
 * @FilePath: \campus-grocery\src\apis\getPost.js
 * @Description: 获取帖子（帖子列表）相关接口
 */
import http from './http'

// 获取帖子列表接口
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

// 获取帖子内容接口
async function getPost(payload) {
  try {
    const res = await http.post('/getPost', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取帖子交互接口
async function getPostInteractive(payload) {
  try {
    const res = await http.post('/getPostInteractive', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { getPostList, getPost, getPostInteractive }
