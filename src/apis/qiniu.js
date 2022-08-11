/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 01:34:20
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

export { getUploadToken }
