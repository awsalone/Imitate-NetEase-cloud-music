import axios from 'axios'
import router from '../router/index.js'
import config from './config.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const instance = axios.create({
  baseURL: config.baseURL,
  headers: { withCredentials: true },
  timeout: 5000
})
// 请求拦截
instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    token && (config.headers.Authorization = token)

    return config
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
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const { response } = error
    if (response) {
      switch (response.status) {
        case 301: // 未登录
          break
      }
    } else {
      // 服务器未返回结果
      if (!window.navigator.online) {
        // 断网处理： 跳转至断网页面
        return
      }
    }
    return Promise.reject(error)
  }
)

export default instance
