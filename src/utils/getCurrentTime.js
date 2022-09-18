/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-18 20:11:34
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 20:12:05
 * @FilePath: \campus-grocery\src\utils\getCurrentTime.js
 * @Description: 获取指定格式的当前时间
 */

import dateFormat from 'dateformat'

function getCurrentTime() {
  const now = Date.now()
  return dateFormat(now, 'yyyy-mm-dd')
}

export default getCurrentTime
