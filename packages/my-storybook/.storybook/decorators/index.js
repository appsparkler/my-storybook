import { Fabric } from '@fluentui/react'
// import './load-dark-theme' // uncomment to load dark theme

const FabricThemeDecorator = (Story) => (
  <Fabric applyThemeToBody>
    <Story />
  </Fabric>
)

export { FabricThemeDecorator }
