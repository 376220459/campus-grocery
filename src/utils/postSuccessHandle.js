/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 16:23:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 18:19:02
 * @FilePath: \campus-grocery\src\utils\postSuccessHandle.js
 * @Description: 帖子发布成功的回调
 */
import { MessageBox as $message } from 'element-ui'

function postSuccessHandle({ confirmHadnle = null, cancelHadnle = null }) {
  if (!confirmHadnle || !(confirmHadnle instanceof Function)) {
    throw new Error('必须传入confirmHadnle参数,且为一个函数')
  }

  $message({
    dangerouslyUseHTMLString: true,
    message: `
          <svg
            width="80px"
            height="80px"
            aria-hidden="true"
          >
            <use xlink:href="#icon-yanhua"></use>
          </svg>
          <p style="color:#67c23a;font-size:30px;margin:10px 0 25px 0;">恭喜，帖子发布成功！</p>
          <div style="display:flex;align-items:center;justify-content:center;margin-bottom:15px;">
            <svg
              width="45px"
              height="45px"
              aria-hidden="true"
            >
              <use xlink:href="#icon-lanhuadou"></use>
            </svg>
            <p style="color:#e6a23c;font-size:25px;">乐豆+100</p>
          </div>
        `,
    center: true,
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: '继续发布',
    confirmButtonText: '前往查看',
    callback: action => {
      if (action === 'confirm') {
        confirmHadnle()
      } else {
        cancelHadnle && cancelHadnle()
      }
    },
  })
}

export default postSuccessHandle
