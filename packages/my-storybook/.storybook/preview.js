import { initializeIcons } from '@uifabric/icons'
// import '@fluentui/react/dist/css/fabric.min.css'
import '../src/bootstrap/scss/bootstrap.scss'
import './styles.css'
import { FabricThemeDecorator } from './decorators'

initializeIcons()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
}

export const decorators = [FabricThemeDecorator]
