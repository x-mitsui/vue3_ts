import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { XRequest } from './service/index'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
const X = new XRequest({
  baseURL: 'http://123.207.32.32:8000',
  requestInterceptor(config: AxiosRequestConfig) {
    console.log('单个实例请求拦截')
    return config
  },
  responseInterceptor(res: AxiosResponse) {
    console.log('单个实例响应拦截')
    return res
  }
})
X.request({
  url: '/home/multidata',
  requestInterceptor(config: AxiosRequestConfig) {
    console.log('单个请求拦截')
    return config
  },
  responseInterceptor(res: AxiosResponse) {
    console.log('单个响应拦截')
    return res
  }
}).then((res) => {
  console.log(res)
})
createApp(App).use(store).use(router).mount('#app')
