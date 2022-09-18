/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 18:07:05
 * @FilePath: \campus-grocery\src\apis\userInteract.js
 * @Description: 用户互动相关接口
 */
import http from './http'

// 获取用户点赞数
async function getUserSupportNum() {
  try {
    const res = await http.get('/getUserSupportNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取用户评论数
async function getUserCommentNum() {
  try {
    const res = await http.get('/getUserCommentNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取用户求购数
async function getUserBuyNum() {
  try {
    const res = await http.get('/getUserBuyNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取用户点赞列表接口
async function getUserSupportList(payload) {
  try {
    const res = await http.post('/getUserSupportList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取用户评论列表接口
async function getUserCommentList(payload) {
  try {
    const res = await http.post('/getUserCommentList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取用户求购列表接口
async function getUserBuyList(payload) {
  try {
    const res = await http.post('/getUserBuyList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { getUserSupportNum, getUserCommentNum, getUserBuyNum, getUserSupportList, getUserCommentList, getUserBuyList }
