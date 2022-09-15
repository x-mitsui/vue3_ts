import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { service } from './service'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
// service
//   .request({
//     url: '/home/multidata',
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       if (config.headers) {
//         config.headers['token'] = '123'
//       }
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
