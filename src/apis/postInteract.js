/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 20:11:58
 * @FilePath: \campus-grocery\src\apis\postInteract.js
 * @Description: 帖子交互信息相关接口
 */
import http from './http'

// 获取帖子交互基础信息接口
async function getPostInteract(payload) {
  try {
    const res = await http.post('/getPostInteract', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取帖子点赞数接口
async function getPostSupportNum(payload) {
  try {
    const res = await http.post('/getPostSupportNum', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取帖子点赞列表接口
async function getPostSupportList(payload) {
  try {
    const res = await http.post('/getPostSupportList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取帖子想要数接口
async function getPostBuyNum(payload) {
  try {
    const res = await http.post('/getPostBuyNum', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 获取帖子点赞列表接口
async function getPostBuyList(payload) {
  try {
    const res = await http.post('/getPostBuyList', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { getPostInteract, getPostSupportNum, getPostSupportList, getPostBuyNum, getPostBuyList }
