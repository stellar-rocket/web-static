import React from 'react'
import ReactDOM from 'react-dom'

import Error from './components/pages/error'
import DefaultTheme from './components/themes/default'

ReactDOM.render(
  <DefaultTheme>
    <Error />
  </DefaultTheme>,
  document.getElementById('root')
)
