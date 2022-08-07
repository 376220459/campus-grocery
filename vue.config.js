const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        ws: 'true',
        changeOrigin: 'true',
      },
    },
  },
})
