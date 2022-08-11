/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 18:02:13
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-10 14:51:59
 * @FilePath: \campus-grocery\src\utils\resHandle.js
 * @Description: 处理请求回应
 */
import { Message } from 'element-ui'

function resHandle(res, { successHandle = null, errorHandle = null, warningHandle = null } = {}) {
  const { code, message = '' } = res

  if (code === 1) {
    // code为1表示请求成功且符合预期
    message && Message.success(message)
    successHandle && successHandle()
  } else if (code === 0) {
    // code为0表示请求失败
    message && Message.error('服务器开小差了，请检查网络。')
    errorHandle && errorHandle()
  } else if (code === -1) {
    // code为-1表示页面被取消或者与服务器断开连接
    Message.error('服务器断开连接...')
  } else {
    // code为其他值表示请求成功，但不符合预期
    message && Message.warning(message)
    warningHandle && warningHandle()
  }
}

export default resHandle
