import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { service } from './service'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
service
  .request({
    url: '/home/multidata',
    requestInterceptor(config: AxiosRequestConfig) {
      console.log('单个请求拦截')
      return config
    },
    responseInterceptor(res: AxiosResponse) {
      console.log('单个响应拦截')
      return res
    }
  })
  .then((res) => {
    console.log(res)
  })
createApp(App).use(store).use(router).mount('#app')
