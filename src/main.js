/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 19:12:44
 * @FilePath: \campus-grocery\src\main.js
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Container,
  Header,
  Main,
  Message,
  Loading,
  Input,
  Select,
  Option,
  Button,
  Popover,
  Badge,
  Carousel,
  CarouselItem,
  Divider,
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Divider)
Vue.use(Loading.directive)
Vue.use(Loading.directive)
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
