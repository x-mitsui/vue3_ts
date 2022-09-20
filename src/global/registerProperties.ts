import { formatUTCString } from '@/utils/dateFormat'
import { App } from 'vue'

export const registerProperties = function (app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUTCString(value)
    }
  }
}
