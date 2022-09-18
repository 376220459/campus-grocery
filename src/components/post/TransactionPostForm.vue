<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 20:21:30
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 21:12:39
 * @FilePath: \campus-grocery\src\components\post\TransactionPostForm.vue
 * @Description: 发布二手交易贴子表单组件
-->
<template>
  <el-form
    ref="transactionPostForm"
    :model="transactionPostForm.data"
    :rules="transactionPostForm.rules"
    label-width="120px"
  >
    <el-form-item
      label="帖子标题："
      prop="title"
    >
      <el-input
        v-model="transactionPostForm.data.title"
        maxlength="30"
        show-word-limit
        placeholder="请填写帖子标题"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="商品类型："
      prop="productCategory"
    >
      <el-select
        v-model="transactionPostForm.data.productCategory"
        placeholder="请选择"
      >
        <el-option
          v-for="(productCategory, index) in productCategoryList"
          :key="index"
          :label="productCategory"
          :value="productCategory"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="商品成色："
      prop="condition"
    >
      <el-select
        v-model="transactionPostForm.data.condition"
        placeholder="请选择"
      >
        <el-option
          v-for="(condition, index) in conditionList"
          :key="index"
          :label="condition"
          :value="condition"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="出售价格："
      prop="price"
      class="price-container"
    >
      <transition
        name="price-input"
        mode="out-in"
      >
        <el-input
          v-if="!isNegotiable"
          v-model="transactionPostForm.data.price"
          placeholder="请填写价格"
        ></el-input>
      </transition>

      <el-switch
        v-model="isNegotiable"
        active-text="价格面议"
        @change="changePirceSelect"
      >
      </el-switch>
    </el-form-item>

    <el-form-item
      label="交易地址："
      prop="transactionPlace"
    >
      <el-input
        v-model="transactionPostForm.data.transactionPlace"
        maxlength="50"
        show-word-limit
        placeholder="交易地址必须填校内地址，否则不会通过审核"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="联系人姓名："
      prop="liaisonName"
    >
      <el-input
        v-model="transactionPostForm.data.liaisonName"
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
        v-model="transactionPostForm.data.liaisonTel"
        placeholder="请填写联系人手机号"
        maxlength="11"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item>
      <p slot="label">
        <span style="color: red">*</span>
        {{ `上传主图${transactionPostForm.data.mainImg ? 1 : 0}/1：` }}
      </p>
      <BaseImgUpload
        ref="BaseImgUploadMainImg"
        tips="发布二手交易，主图比例必须为1:1，否则图片会被裁剪，拉低展示效果。"
        :limitNum="1"
        :postType="transactionPostForm.data.postType"
        @uploaded="uploadedMainImg"
        @remove="removeMainImg"
      />
    </el-form-item>

    <el-form-item :label="`添加图片${transactionPostForm.data.imgs.length}/6：`">
      <BaseImgUpload
        ref="BaseImgUploadContent"
        :limitNum="6"
        :postType="transactionPostForm.data.postType"
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
        v-model="transactionPostForm.data.content"
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
import {
  titleRule,
  productCategoryRule,
  conditionRule,
  priceRule,
  placeRule,
  nameRule,
  telNumberRule,
  contentRule,
} from '@/utils/rules'
import BaseImgUpload from '@/components/base/BaseImgUpload.vue'
import { mapState, mapMutations } from 'vuex'
import { postPost } from '@/apis/postPost'
import resHandle from '@/utils/resHandle'
import getCurrentTime from '@/utils/getCurrentTime'
import postSuccessHandle from '@/utils/postSuccessHandle'

export default {
  name: 'TransactionPostForm',

  components: { BaseImgUpload },

  data() {
    return {
      transactionPostForm: {
        data: {
          postType: 'transaction',
          telNumber: '',
          postTime: '',
          productCategory: '',
          title: '',
          content: '',
          mainImg: '',
          imgs: [],
          condition: '',
          price: '',
          transactionPlace: '',
          liaisonName: '',
          liaisonTel: '',
        },
        rules: {
          telNumber: telNumberRule,
          productCategory: productCategoryRule,
          title: titleRule,
          content: contentRule,
          condition: conditionRule,
          price: priceRule,
          transactionPlace: placeRule,
          liaisonName: nameRule,
          liaisonTel: telNumberRule,
        },
      },
      productCategoryList: ['书籍资料', '日常用品', '电子设备', '体育用品', '其它'],
      conditionList: ['全新', '九成新', '七成新', '五成新', '其他'],
      isNegotiable: false,
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 更改价格面议按钮时触发
    changePirceSelect(isNegotiable) {
      if (isNegotiable) {
        // 如果面议，则更换价格的校验规则，并立即触发规则
        this.transactionPostForm.rules.price = [{ required: true, message: '请填写价格', trigger: 'blur' }]
        this.transactionPostForm.data.price = '面议'

        this.$refs.transactionPostForm.validateField('price')
      } else {
        // 如果不面议，则更换到价格的初始校验规则
        this.transactionPostForm.rules.price = priceRule
        this.transactionPostForm.data.price = ''
      }
    },

    // 删除主图回调
    removeMainImg() {
      this.transactionPostForm.data.mainImg = ''
    },

    // 删除内容图片回调
    removeImgs(url) {
      const index = this.transactionPostForm.data.imgs.indexOf(url)
      this.transactionPostForm.data.imgs.splice(index, 1)
    },

    // 上传主图回调
    uploadedMainImg(imgs) {
      this.transactionPostForm.data.mainImg = imgs[0]
    },

    // 上传内容图片回调
    uploadedContent(imgs) {
      this.transactionPostForm.data.imgs = imgs
    },

    // 发布帖子
    postHandle() {
      this.$refs.transactionPostForm.validate(async valid => {
        if (!valid) {
          return false
        }

        if (this.transactionPostForm.data.mainImg) {
          this.updateLoading({
            loading: true,
            loadingText: '正在发布，请稍等...',
          })

          this.fillFormData()
          const res = await postPost(this.transactionPostForm.data)
          resHandle(res, {
            successHandle: () => {
              postSuccessHandle({
                confirmHadnle: () => {
                  const transactionID = res.data.postData.id
                  this.$router.push(`/showPost?postType=transaction&id=${transactionID}`)
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
      const data = this.transactionPostForm.data
      ;[data.telNumber, data.postTime] = [this.userInfo.telNumber, getCurrentTime()]
    },
  },
}
</script>

<style scoped lang="scss">
.el-form {
  padding-top: 10px;

  .price-container {
    // vue自带动画效果实现
    .price-input-enter-active,
    .price-input-leave-active {
      transition: all 1s;
    }

    .price-input-enter,
    .price-input-leave-to {
      width: 0;
      opacity: 0;
    }

    .el-switch {
      width: 150px;
      height: 40px;
      margin-left: 20px;
    }
  }

  .submit {
    width: 100%;
  }
}
</style>
