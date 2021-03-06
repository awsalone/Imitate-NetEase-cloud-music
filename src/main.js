import Vue from 'vue'
import './assets/css/reset.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import { Popup } from 'vant'
import { Button, Form, FormItem, input, MessageBox } from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueLazyLoad)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(input)
Vue.use(Popup)

MessageBox.install = function (Vue, options) {
  Vue.prototype.$message = MessageBox
}

Vue.use(MessageBox)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
