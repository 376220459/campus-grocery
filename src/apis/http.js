/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:33:54
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 16:43:06
 * @FilePath: \campus-sso\src\apis\index.js
 * @Description: 封装axios
 */
import axios from 'axios'

const http = axios.create({
  baseURL: `/api`,
  timeout: 30000,
})

export default http
