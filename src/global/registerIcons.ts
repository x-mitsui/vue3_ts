import * as AllIcons from '@element-plus/icons-vue'
import { App } from 'vue'
const registerIcons = (app: App) => {
  for (const [key, component] of Object.entries(AllIcons)) {
    app.component(key, component)
  }
}
export { registerIcons }
