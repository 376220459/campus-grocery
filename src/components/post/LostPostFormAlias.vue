<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 20:21:30
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 19:47:54
 * @FilePath: \campus-grocery\src\components\post\LostPostFormAlias.vue
 * @Description: 发布失物招领贴子表单组件
-->
<template>
  <el-form
    ref="lostPostForm"
    :model="lostPostForm.data"
    :rules="lostPostForm.rules"
    label-width="120px"
  >
    <el-form-item
      label="帖子标题："
      prop="title"
    >
      <el-input
        v-model="lostPostForm.data.title"
        maxlength="30"
        show-word-limit
        placeholder="请填写帖子标题"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="领取地址："
      prop="receivePlace"
    >
      <el-input
        v-model="lostPostForm.data.receivePlace"
        maxlength="50"
        show-word-limit
        placeholder="领取地址必须填校内地址，否则不会通过审核"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="联系人姓名："
      prop="liaisonName"
    >
      <el-input
        v-model="lostPostForm.data.liaisonName"
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
        v-model="lostPostForm.data.liaisonTel"
        placeholder="请填写联系人手机号"
        maxlength="11"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item>
      <p slot="label">
        <span style="color: red">*</span>
        {{ `上传主图${lostPostForm.data.mainImg ? 1 : 0}/1：` }}
      </p>
      <BaseImgUpload
        ref="BaseImgUploadMainImg"
        :limitNum="1"
        :postType="lostPostForm.data.postType"
        @uploaded="uploadedMainImg"
        @remove="removeMainImg"
      />
    </el-form-item>

    <el-form-item :label="`添加图片${lostPostForm.data.imgs.length}/6：`">
      <BaseImgUpload
        ref="BaseImgUploadContent"
        :limitNum="6"
        :postType="lostPostForm.data.postType"
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
        v-model="lostPostForm.data.content"
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
import { titleRule, placeRule, nameRule, telNumberRule, contentRule } from '@/utils/rules'
import BaseImgUpload from '@/components/base/BaseImgUpload.vue'
import { mapState, mapMutations } from 'vuex'
import { postPost } from '@/apis/postPost'
import resHandle from '@/utils/resHandle'
import postSuccessHandle from '@/utils/postSuccessHandle'

export default {
  name: 'LostPostFormAlias',

  components: { BaseImgUpload },

  data() {
    return {
      lostPostForm: {
        data: {
          postType: 'lost',
          telNumber: '',
          postTime: '',
          title: '',
          content: '',
          mainImg: '',
          imgs: [],
          receivePlace: '',
          liaisonName: '',
          liaisonTel: '',
        },
        rules: {
          telNumber: telNumberRule,
          title: titleRule,
          content: contentRule,
          receivePlace: placeRule,
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
      this.lostPostForm.data.mainImg = ''
    },

    // 删除内容图片回调
    removeImgs(url) {
      const index = this.lostPostForm.data.imgs.indexOf(url)
      this.lostPostForm.data.imgs.splice(index, 1)
    },

    // 上传主图回调
    uploadedMainImg(imgs) {
      this.lostPostForm.data.mainImg = imgs[0]
    },

    // 上传内容图片回调
    uploadedContent(imgs) {
      this.lostPostForm.data.imgs = imgs
    },

    // 发布帖子
    postHandle() {
      this.$refs.lostPostForm.validate(async valid => {
        if (!valid) {
          return false
        }

        if (this.lostPostForm.data.mainImg) {
          this.updateLoading({
            loading: true,
            loadingText: '正在发布，请稍等...',
          })

          this.fillFormData()
          const res = await postPost(this.lostPostForm.data)
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
      const data = this.lostPostForm.data
      const now = Date.now()
      ;[data.telNumber, data.postTime] = [this.userInfo.telNumber, this.$dateFormat(now, 'yyyy-mm-dd')]
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
