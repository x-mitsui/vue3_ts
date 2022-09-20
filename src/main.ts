import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { restoreLocalStorage, store } from './store'

import 'normalize.css'
import './assets/css/index.less'
import { globalRegister } from './global'

const app = createApp(App)
app.use(store)

restoreLocalStorage()
app.use(router)
app.use(globalRegister)
app.mount('#app')
