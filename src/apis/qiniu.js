/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 23:56:09
 * @FilePath: \campus-grocery\src\apis\qiniu.js
 * @Description: 七牛云相关接口
 */
import http from './http'

// 获取七牛云uploadToken接口
async function getUploadToken(payload) {
  try {
    const res = await http.post('/getUploadToken', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 删除七牛云文件（图片）接口
async function removeImg(payload) {
  // 此接口不能在此处捕获错误，因为在逻辑处理的时候需要用到

  // try {
  const res = await http.post('/removeImg', payload)
  return res.data
  // } catch (error) {
  //   return {
  //     code: 0,
  //     error,
  //   }
  // }
}

export { getUploadToken, removeImg }
