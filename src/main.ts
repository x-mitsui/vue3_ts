import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { restoreLocalStorage, store } from './store'

import 'normalize.css'
import './assets/css/index.less'
import { globalRegister } from './global'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import { PageContent } from '@/components/PageContent'
import { PageSearch } from '@/components/PageSearch'
import { PageModal } from '@/components/PageModal'

const app = createApp(App)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn
})

restoreLocalStorage()
app.use(router)
app.use(globalRegister)

app.component('PageContent', PageContent)
app.component('PageSearch', PageSearch)
app.component('PageModal', PageModal)
app.mount('#app')
