import Vue from 'vue'
import './assets/css/reset.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyLoad)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
