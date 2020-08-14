import axios from 'axios'
import config from './config.js'

const instance = axios.create({
  baseURL: config.baseURL
})
// 请求拦截
instance.interceptors.request.use(
  config => {
    // Tip: 1
    // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

    // Tip: 2
    // 带上 token , 可以结合 vuex 或者重 localStorage
    // if (store.getters.token) {
    //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // } else {
    //     // 重定向到登录页面
    // }

    // Tip: 3
    // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    return config
  }
)
// 响应拦截
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance
