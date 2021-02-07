import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initializeIcons } from '@uifabric/icons'
import 'office-ui-fabric-react/dist/css/fabric.min.css'

initializeIcons()

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
