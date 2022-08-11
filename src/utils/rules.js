/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 15:42:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 23:33:14
 * @FilePath: \campus-grocery\src\utils\rules.js
 * @Description: 字段验证规则
 */
const telNumberRule = [
  { required: true, message: '请填写手机号', trigger: 'blur' },
  {
    pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    message: '请填写合法手机号',
    trigger: 'blur',
  },
]
const loginPasswordRule = [{ required: true, message: '请填写密码', trigger: 'blur' }]
const registerPasswordRule = [
  { required: true, message: '请填写密码', trigger: 'blur' },
  {
    min: 6,
    max: 20,
    message: '密码应该由6-20个字符组成',
    trigger: 'blur',
  },
  {
    pattern: /^[\w.+-]+$/,
    message: '只能包含数字、字母、常见标点符号',
    trigger: 'blur',
  },
  {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![._+-]+$)[\w.+-]{6,20}$/,
    message: '数字、字母和标点符号中至少包含两种',
    trigger: 'blur',
  },
]
const nickNameRule = [
  { required: true, message: '请填写昵称', trigger: 'blur' },
  {
    min: 3,
    max: 8,
    message: '昵称应该由3-8个字符组成',
    trigger: 'blur',
  },
  {
    pattern: /^[\w\u4e00-\u9fa5]+$/,
    message: '只能包含汉字、字母和数字',
    trigger: 'blur',
  },
]
const schoolRule = [{ required: true, message: '请选择学校', trigger: 'change' }]
const studentNumberRule = [
  { required: true, message: '请填写学号', trigger: 'blur' },
  {
    pattern: /^\d{6,12}$/,
    message: '请填写正确的学号',
    trigger: 'blur',
  },
]
const jobNumberRule = [
  { required: true, message: '请填写工号', trigger: 'blur' },
  {
    pattern: /^\d{6,12}$/,
    message: '请填写正确的工号',
    trigger: 'blur',
  },
]
const nameRule = [
  { required: true, message: '请填写姓名', trigger: 'blur' },
  {
    pattern: /^[\u4e00-\u9fa5]{2,8}$/,
    message: '请填写正确的姓名',
    trigger: 'blur',
  },
]
const verifCodeRule = [
  { required: true, message: '请填写验证码', trigger: 'blur' },
  {
    pattern: /^\d+$/,
    message: '请填写合法的验证码',
    trigger: 'blur',
  },
]
const titleRule = [{ required: true, message: '请填写帖子标题', trigger: 'blur' }]
const productCategoryRule = [{ required: true, message: '请选择商品类型', trigger: 'blur' }]
const conditionRule = [{ required: true, message: '请选择商品成色', trigger: 'blur' }]
const priceRule = [
  { required: true, message: '请填写价格', trigger: 'blur' },
  {
    pattern: /^\d+(.\d{1,2})?$/,
    message: '请填写正确的价格（最多两位小数）',
    trigger: 'blur',
  },
]
const transactionPlaceRule = [{ required: true, message: '请填写地址', trigger: 'blur' }]
const contentRule = [{ required: true, message: '请填写内容', trigger: 'blur' }]

export {
  telNumberRule,
  verifCodeRule,
  loginPasswordRule,
  registerPasswordRule,
  nickNameRule,
  schoolRule,
  studentNumberRule,
  jobNumberRule,
  nameRule,
  titleRule,
  productCategoryRule,
  conditionRule,
  priceRule,
  transactionPlaceRule,
  contentRule,
}
