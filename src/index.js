import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import DefaultTheme from './components/themes/default'

ReactDOM.render(
  <DefaultTheme>
    <App />
  </DefaultTheme>,
  document.getElementById('root')
)
