import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import * as AllIcons from '@element-plus/icons-vue'

import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(store)
app.use(router)
for (const [key, component] of Object.entries(AllIcons)) {
  app.component(key, component)
}

app.mount('#app')
