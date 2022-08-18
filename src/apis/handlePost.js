/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 20:38:45
 * @FilePath: \campus-grocery\src\apis\handlePost.js
 * @Description: 操作帖子相关接口
 */
import http from './http'

// 点赞帖子接口
async function supportPost(payload) {
  try {
    const res = await http.post('/supportPost', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 取消点赞帖子接口
async function cancelSupportPost(payload) {
  try {
    const res = await http.post('/cancelSupportPost', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 想要帖子接口
async function buyPost(payload) {
  try {
    const res = await http.post('/buyPost', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 取消想要帖子接口
async function cancelBuyPost(payload) {
  try {
    const res = await http.post('/cancelBuyPost', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { supportPost, cancelSupportPost, buyPost, cancelBuyPost }
