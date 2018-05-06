import React from 'react'

import {
  lightBlue700,
  grey600,
  blue500, blue600, blue700,
  fullWhite, white
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const theme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: lightBlue700,
    primary2Color: lightBlue700,
    primary3Color: grey600,
    accent1Color: blue600,
    accent2Color: blue700,
    accent3Color: blue500,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: white,
    canvasColor: '#113547',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  }
})

export default class DefaultTheme extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}
