/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-22 22:07:05
 * @FilePath: \campus-grocery\src\apis\userMessage.js
 * @Description: 用户消息相关接口
 */
import http from './http'

// 获取未读点赞数
async function getUnreadSupportNum() {
  try {
    const res = await http.get('/getUnreadSupportNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取未读评论数
async function getUnreadCommentNum() {
  try {
    const res = await http.get('/getUnreadCommentNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取未读求购数
async function getUnreadBuyNum() {
  try {
    const res = await http.get('/getUnreadBuyNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取未读系统消息数
async function getUnreadSystemNum() {
  try {
    const res = await http.get('/getUnreadSystemNum')
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取点赞消息接口
async function getSupportMessageList(payload) {
  try {
    const res = await http.post('/getSupportMessageList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取评论消息接口
async function getCommentMessageList(payload) {
  try {
    const res = await http.post('/getCommentMessageList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取求购消息接口
async function getBuyMessageList(payload) {
  try {
    const res = await http.post('/getBuyMessageList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取系统消息接口
async function getSystemMessageList(payload) {
  try {
    const res = await http.post('/getSystemMessageList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export {
  getUnreadSupportNum,
  getUnreadCommentNum,
  getUnreadBuyNum,
  getUnreadSystemNum,
  getSupportMessageList,
  getCommentMessageList,
  getBuyMessageList,
  getSystemMessageList,
}
