/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 20:12:02
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-28 16:39:51
 * @FilePath: \campus-grocery\src\main.js
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import dateFormat from 'dateformat'
import VueCookies from 'vue-cookies'

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
  Tooltip,
  Pagination,
  Tabs,
  TabPane,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Switch,
  Upload,
  Dialog,
  MessageBox,
  Backtop,
  Drawer,
  InfiniteScroll,
  Descriptions,
  DescriptionsItem,
  DatePicker,
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
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Backtop)
Vue.use(Drawer)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(DatePicker)
Vue.use(InfiniteScroll)
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$msgbox = MessageBox

Vue.prototype.$dateFormat = dateFormat
Vue.prototype.$cookies = VueCookies

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
