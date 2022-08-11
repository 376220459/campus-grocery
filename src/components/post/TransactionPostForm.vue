<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-11 20:21:30
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 01:08:40
 * @FilePath: \campus-grocery\src\components\post\TransactionPostForm.vue
 * @Description: 发布二手交易贴子表单组件
-->
<template>
  <el-form
    ref="transactionPostForm"
    :model="transactionPostForm.data"
    :rules="transactionPostForm.rules"
    label-width="110px"
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
        style="width: 100%"
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
        style="width: 100%"
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
    >
      <el-switch
        v-model="isNegotiable"
        active-text="价格面议"
        @change="changePirceSelect"
        style="width: 100%"
      >
      </el-switch>

      <el-input
        v-if="!isNegotiable"
        v-model="transactionPostForm.data.price"
        placeholder="请填写价格"
        style="width: 100%"
      ></el-input>
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
      ></el-input>
    </el-form-item>

    <el-form-item
      label="联系人手机："
      prop="liaisonTel"
    >
      <el-input
        v-model="transactionPostForm.data.liaisonTel"
        placeholder="请填写联系人手机号"
      ></el-input>
    </el-form-item>

    <el-form-item label="添加图片：">
      <el-upload
        action="https://upload-z1.qiniup.com"
        list-type="picture-card"
        :data="{ token: uploadToken, key: 'transaction/123' }"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
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
        type="primary"
        @click="test"
        style="width: 100%"
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
  transactionPlaceRule,
  nameRule,
  telNumberRule,
  contentRule,
} from '@/utils/rules'
import { getUploadToken } from '@/apis/qiniu'
import resHandle from '@/utils/resHandle'

export default {
  name: 'TransactionPostForm',

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
          pictures: [],
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
          transactionPlace: transactionPlaceRule,
          liaisonName: nameRule,
          liaisonTel: telNumberRule,
        },
      },
      productCategoryList: ['书籍资料', '日常用品', '电子设备', '体育用品', '其它'],
      conditionList: ['全新', '九成新', '七成新', '五成新', '其他'],
      isNegotiable: false,
      uploadToken: '',
    }
  },

  methods: {
    changePirceSelect(isNegotiable) {
      if (isNegotiable) {
        this.transactionPostForm.rules.price = [{ required: true, message: '请填写价格', trigger: 'blur' }]
        this.transactionPostForm.data.price = '面议'
      } else {
        this.transactionPostForm.rules.price = priceRule
        this.transactionPostForm.data.price = ''
      }

      this.$refs.transactionPostForm.validateField('price')
    },

    async test() {
      const res = await getUploadToken({ bucket: 'campus-grocery' })
      resHandle(res, {
        successHandle: () => {
          this.uploadToken = res.data.uploadToken
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
.el-form {
  padding-top: 10px;
}
</style>
