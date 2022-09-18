/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 21:04:07
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 21:37:26
 * @FilePath: \campus-grocery\src\utils\getUploadTokenHandle.js
 * @Description: 获取upLoadToken
 */

import resHandle from './resHandle'
import { getUploadToken } from '@/apis/qiniu'
import store from '@/store'

// 从后端获取七牛云的uploadToken
async function getUploadTokenHandle() {
  const res = await getUploadToken({ bucket: process.env.VUE_APP_BUCKET })
  return resHandle(res, {
    successHandle: () => {
      store.commit('setUploadToken', { uploadToken: res.data.uploadToken })
    },
  })
}

export default getUploadTokenHandle
