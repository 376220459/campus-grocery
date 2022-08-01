module.exports = {
  printWidth: 120, // 一行最多 120 字符(默认80)
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否用制表符代替空格执行缩进（默认false）
  semi: false, // 行尾是否要有分号(默认true)
  singleQuote: true, // 使用单引号（默认false）
  quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  trailingComma: 'all', // 多行使用拖尾逗号（默认none），有三个可选值"<none|es5|all>"
  bracketSpacing: true, // 在对象、数组中的属性之间是否填充空格
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
  arrowParens: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号(avoid表示 不必要)
  endOfLine: 'auto', // 设置换行风格,可选值：lf / crlf / cr / auto
}
