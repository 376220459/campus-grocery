<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-12 19:59:54
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-09-18 19:27:18
 * @FilePath: \campus-grocery\src\components\base\BaseImgUpload.vue
 * @Description: 基础组件-图片上传
-->
<template>
  <div @click="tipsHandle">
    <el-upload
      list-type="picture-card"
      accept="image/jpg,image/jpeg,image/png"
      :multiple="true"
      :limit="limitNum"
      :on-exceed="overLimit"
      :action="uploadDomain"
      :data="qiniuData"
      :on-change="changeImgList"
      :on-preview="showImg"
      :before-upload="beforeUpload"
      :on-success="uploadSuccessHandle"
      :before-remove="beforeRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialog.dialogVisible">
      <img
        width="100%"
        :src="dialog.dialogImageUrl"
        alt="加载出错"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import resHandle from '@/utils/resHandle'
import { removeImg } from '@/apis/qiniu'
import _ from 'lodash'

export default {
  name: 'BaseImgUpload',

  props: {
    limitNum: {
      type: Number,
      default: 1,
    },

    limitSize: {
      type: Number,
      default: 2048 * 1000,
    },

    postType: {
      type: String,
      required: true,
    },

    tips: {
      type: String,
      default: '',
    },

    uploadHeadTag: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      qiniuData: {
        token: '',
        key: '',
      },

      dialog: {
        dialogImageUrl: '',
        dialogVisible: false,
      },

      uploadedImgs: [],

      firstUploadTag: true,
    }
  },

  computed: {
    ...mapState(['userInfo', 'uploadToken']),
    uploadDomain() {
      return process.env.VUE_APP_QINIU_UPLOAD_DOMAIN
    },
  },

  methods: {
    // 超出限制提示
    overLimit() {
      this.$message.warning('图片个数超出最大限制')
    },

    // 特殊尺寸提示
    tipsHandle(e) {
      if (this.firstUploadTag && this.tips) {
        console.log(1)
        e.preventDefault()
        this.$alert(this.tips, '注意', {
          confirmButtonText: '我已了解',
          callback: action => {
            if (action === 'confirm') {
              document.getElementsByClassName('el-upload__input')[0].click()
            }
          },
        })
        this.firstUploadTag = false
      }
    },

    // 图片列表改变时触发，此处主要是添加图片的回调
    changeImgList(file) {
      const res = this.checkImg(file.raw)
      res && this.$message.warning(res)
    },

    // 核对图片是否符合要求
    checkImg(payload) {
      const { type, size } = payload
      const imgTypes = ['image/jpeg', 'image/pjpeg', 'image/png']

      if (!imgTypes.includes(type)) {
        return '只能添加类型为JPG、JPEG、PNG的图片'
      }

      if (size > this.limitSize) {
        return `图片大小需限制在${this.limitSize}以内`
      }

      // 没有结果就是最好的结果
      return null
    },

    // 预览图片
    showImg(file) {
      this.dialog.dialogImageUrl = file.url
      this.dialog.dialogVisible = true
    },

    // 上传图片前执行
    beforeUpload(file) {
      // 如果是上传图像，则在每次上传新图片前，都需要删除旧图片
      if (this.uploadHeadTag) {
        this.uploadedImgs[0] && this.beforeRemove(this.uploadedImgs[0])
      }

      this.qiniuData.key = this.generateKey(file.name)
    },

    // 生成文件唯一key值
    generateKey(fileName) {
      const now = Date.now()
      const {
        postType,
        userInfo: { telNumber },
      } = this

      return `${postType}/${telNumber}${now}${fileName}`
    },

    // 上传成功回调
    uploadSuccessHandle(response, file, fileList) {
      this.uploadedImgs.push({
        uid: file.uid,
        key: response.key,
        url: process.env.VUE_APP_QINIU_DOWNLOAD_DOMAIN + response.key,
      })

      if (this.uploadedImgs.length === fileList.length) {
        const imgs = this.uploadedImgs.map(img => img.url)
        this.$emit('uploaded', imgs)
        // alert(`所有图片上传完成：${JSON.stringify(this.uploadedImgs)}`)
      }
    },

    // 上传失败回调
    uploadErrorHandle() {
      this.$message.error('上传图片出错,请稍后再试')
    },

    // 删除文件回调
    beforeRemove(file) {
      const img = this.uploadedImgs.find(img => _.isMatch(img, { uid: file.uid }))

      // 此回调不支持异步函数,只能用promise来异步，reject时可以阻塞
      return new Promise((reslove, reject) => {
        if (img) {
          const imgIndex = this.uploadedImgs.indexOf(img)

          removeImg({
            bucket: process.env.VUE_APP_BUCKET,
            key: img.key,
          })
            .then(res => {
              resHandle(res, {
                successHandle: () => {
                  // 从上传文件列表删除后，需要从uploadedImgs中删除对应图片
                  this.uploadedImgs.splice(imgIndex, 1)
                  this.$emit('remove', img.url)

                  // 根据上传类型返回消息提示
                  if (this.uploadHeadTag) {
                    this.$message.success('头像已更换')
                  } else {
                    this.$message.success('图片删除成功')
                  }
                },
              })
              reslove()
            })
            .catch(err => {
              resHandle({ code: 0, err })
              reject()
            })
        } else {
          reslove()
        }
      })
    },
  },

  // 组件挂载后，设置uploadToken
  mounted() {
    this.qiniuData.token = this.uploadToken
  },
}
</script>

<style scoped lang="scss"></style>
