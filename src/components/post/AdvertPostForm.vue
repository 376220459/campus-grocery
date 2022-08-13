<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 20:21:30
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 20:09:10
 * @FilePath: \campus-grocery\src\components\post\AdvertPostForm.vue
 * @Description: 发布广告贴子表单组件
-->
<template>
  <el-form
    ref="advertPostForm"
    :model="advertPostForm.data"
    :rules="advertPostForm.rules"
    label-width="120px"
  >
    <el-form-item
      label="帖子标题："
      prop="title"
    >
      <el-input
        v-model="advertPostForm.data.title"
        maxlength="30"
        show-word-limit
        placeholder="请填写帖子标题"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="联系人姓名："
      prop="liaisonName"
    >
      <el-input
        v-model="advertPostForm.data.liaisonName"
        placeholder="请填写联系人姓名"
        maxlength="8"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item
      label="联系人手机："
      prop="liaisonTel"
    >
      <el-input
        v-model="advertPostForm.data.liaisonTel"
        placeholder="请填写联系人手机号"
        maxlength="11"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item>
      <p slot="label">
        <span style="color: red">*</span>
        {{ `上传主图${advertPostForm.data.mainImg ? 1 : 0}/1：` }}
      </p>
      <BaseImgUpload
        ref="BaseImgUploadMainImg"
        tips="发布广告，主图比例必须为16:9，否则图片会被裁剪，拉低展示效果。"
        :limitNum="1"
        :postType="advertPostForm.data.postType"
        @uploaded="uploadedMainImg"
        @remove="removeMainImg"
      />
    </el-form-item>

    <el-form-item :label="`添加图片${advertPostForm.data.imgs.length}/6：`">
      <BaseImgUpload
        ref="BaseImgUploadContent"
        :limitNum="6"
        :postType="advertPostForm.data.postType"
        @uploaded="uploadedContent"
        @remove="removeImgs"
      />
    </el-form-item>

    <el-form-item
      label="帖子内容："
      prop="content"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 100 }"
        v-model="advertPostForm.data.content"
        maxlength="3000"
        show-word-limit
        placeholder="请填写帖子内容..."
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        class="submit"
        type="primary"
        @click="postHandle"
        >发布</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { titleRule, nameRule, telNumberRule, contentRule } from '@/utils/rules'
import BaseImgUpload from '@/components/base/BaseImgUpload.vue'
import { mapState, mapMutations } from 'vuex'
import { postPost } from '@/apis/postPost'
import resHandle from '@/utils/resHandle'
import postSuccessHandle from '@/utils/postSuccessHandle'

export default {
  name: 'advertPostForm',

  components: { BaseImgUpload },

  data() {
    return {
      advertPostForm: {
        data: {
          postType: 'advert',
          telNumber: '',
          postTime: '',
          title: '',
          content: '',
          mainImg: '',
          imgs: [],
          liaisonName: '',
          liaisonTel: '',
        },
        rules: {
          telNumber: telNumberRule,
          title: titleRule,
          content: contentRule,
          liaisonName: nameRule,
          liaisonTel: telNumberRule,
        },
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 删除主图回调
    removeMainImg() {
      this.advertPostForm.data.mainImg = ''
    },

    // 删除内容图片回调
    removeImgs(url) {
      const index = this.advertPostForm.data.imgs.indexOf(url)
      this.advertPostForm.data.imgs.splice(index, 1)
    },

    // 上传主图回调
    uploadedMainImg(imgs) {
      this.advertPostForm.data.mainImg = imgs[0]
    },

    // 上传内容图片回调
    uploadedContent(imgs) {
      this.advertPostForm.data.imgs = imgs
    },

    // 发布帖子
    postHandle() {
      this.$refs.advertPostForm.validate(async valid => {
        if (!valid) {
          return false
        }

        if (this.advertPostForm.data.mainImg) {
          this.updateLoading({
            loading: true,
            loadingText: '正在发布，请稍等...',
          })

          this.fillFormData()
          const res = await postPost(this.advertPostForm.data)
          resHandle(res, {
            successHandle: () => {
              postSuccessHandle({
                confirmHadnle: () => {
                  alert('发布成功回调')
                },
                cancelHadnle: () => {
                  window.location.reload()
                },
              })
            },
            finallyHandle: () => {
              this.updateLoading({
                loading: false,
              })
            },
          })
        } else {
          this.$message.warning('必须上传主图')
        }
      })
    },

    // 补全不需要用户手动输入的表单数据
    fillFormData() {
      const data = this.advertPostForm.data
      const now = Date.now()
      ;[data.telNumber, data.postTime] = [this.userInfo.telNumber, this.$dateFormat(now, 'yyyy-mm-dd HH:MM:ss')]
    },
  },
}
</script>

<style scoped lang="scss">
.el-form {
  padding-top: 10px;

  .submit {
    width: 100%;
  }
}
</style>
