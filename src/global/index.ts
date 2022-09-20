import { App } from 'vue'
import { registerIcons } from './registerIcons'
import { registerProperties } from './registerProperties'

export function globalRegister(app: App): void {
  app.use(registerIcons)
  app.use(registerProperties)
}
