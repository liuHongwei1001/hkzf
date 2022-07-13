import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Toast, Lazyload } from 'vant'
import 'vant/lib/index.css'
// 引入全部样式
import 'vant/lib/index.less'
import '@/styles/index.less'
import 'amfe-flexible'
import '@/components'

Vue.use(Vant)
Vue.use(Lazyload)
Toast.setDefaultOptions({ duration: 1000 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
