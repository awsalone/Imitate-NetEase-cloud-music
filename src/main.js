import Vue from 'vue'
import './assets/css/reset.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import { Button, Form, FormItem, input } from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueLazyLoad)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(input)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
