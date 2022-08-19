/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 14:39:51
 * @FilePath: \campus-grocery\vue.config.js
 * @Description:
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    port: '8080',
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        ws: 'true',
        changeOrigin: 'true',
      },
    },
  },
})
