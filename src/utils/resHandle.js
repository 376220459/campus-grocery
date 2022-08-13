/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 18:02:13
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 15:30:41
 * @FilePath: \campus-grocery\src\utils\resHandle.js
 * @Description: 处理请求回应
 */
import { Message } from 'element-ui'

function resHandle(res, { successHandle = null, errorHandle = null, warningHandle = null, finallyHandle = null } = {}) {
  const { code = 0, message = '' } = res

  if (code === 1) {
    // code为1表示请求成功且符合预期
    message && Message.success(message)
    successHandle && successHandle()
    finallyHandle && finallyHandle()
    return true
  } else if (code === 0) {
    // code为0表示请求失败
    Message.error('服务器开小差了，请检查网络。')
    errorHandle && errorHandle()
    finallyHandle && finallyHandle()
    return false
  }
  // code为其他值表示请求成功，但不符合预期
  message && Message.warning(message)
  warningHandle && warningHandle()
  finallyHandle && finallyHandle()
  return false
}

export default resHandle
