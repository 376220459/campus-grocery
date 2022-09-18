<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 18:28:55
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 21:12:30
 * @FilePath: \campus-grocery\src\components\post\CampusPostForm.vue
 * @Description: 发布校园二手交易帖子表单组件
-->
<template>
  <el-form
    ref="campusPostForm"
    :model="campusPostForm.data"
    :rules="campusPostForm.rules"
    label-width="120px"
  >
    <el-form-item
      label="帖子标题："
      prop="title"
    >
      <el-input
        v-model="campusPostForm.data.title"
        maxlength="30"
        show-word-limit
        placeholder="请填写帖子标题"
      ></el-input>
    </el-form-item>

    <el-form-item :label="`添加图片${campusPostForm.data.imgs.length}/6：`">
      <BaseImgUpload
        ref="BaseImgUploadContent"
        :limitNum="6"
        :postType="campusPostForm.data.postType"
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
        v-model="campusPostForm.data.content"
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
import { titleRule, contentRule } from '@/utils/rules'
import BaseImgUpload from '@/components/base/BaseImgUpload.vue'
import { mapState, mapMutations } from 'vuex'
import { postPost } from '@/apis/postPost'
import resHandle from '@/utils/resHandle'
import postSuccessHandle from '@/utils/postSuccessHandle'
import getCurrentTime from '@/utils/getCurrentTime'

export default {
  name: 'CampusPostForm',

  components: { BaseImgUpload },

  data() {
    return {
      campusPostForm: {
        data: {
          postType: 'campus',
          telNumber: '',
          postTime: '',
          title: '',
          content: '',
          imgs: [],
        },
        rules: {
          title: titleRule,
          content: contentRule,
        },
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 删除内容图片回调
    removeImgs(url) {
      const index = this.campusPostForm.data.imgs.indexOf(url)
      this.campusPostForm.data.imgs.splice(index, 1)
    },

    // 上传内容图片回调
    uploadedContent(imgs) {
      this.campusPostForm.data.imgs = imgs
    },

    // 发布帖子
    postHandle() {
      this.$refs.campusPostForm.validate(async valid => {
        if (!valid) {
          return false
        }
        this.updateLoading({
          loading: true,
          loadingText: '正在发布，请稍等...',
        })

        this.fillFormData()
        const res = await postPost(this.campusPostForm.data)
        resHandle(res, {
          successHandle: () => {
            postSuccessHandle({
              confirmHadnle: () => {
                const campusID = res.data.postData.id
                this.$router.push(`/showPost?postType=campus&id=${campusID}`)
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
      })
    },

    // 补全不需要用户手动输入的表单数据
    fillFormData() {
      const data = this.campusPostForm.data
      ;[data.telNumber, data.postTime] = [this.userInfo.telNumber, getCurrentTime()]
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
