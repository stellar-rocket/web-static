import React from 'react'
import Toggle from 'material-ui/Toggle'

import style from './formatLumens.css'

const LOCALSTORAGE_NAME = 'params:formatLumens'

export default class formatLumensForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      state: window.localStorage.getItem(LOCALSTORAGE_NAME) || 'stroops' // lumens or stroops
    }
  }

  handleToggle (e) {
    let state = e.target.checked ? 'lumens' : 'stroops'
    this.setState({
      state
    })
    window.localStorage.setItem(LOCALSTORAGE_NAME, state)
    this.props.forceUpdate()
  }

  render () {
    return (
      <Toggle
        className={style.input}
        label='Affichage en lumens'
        onToggle={this.handleToggle.bind(this)}
        toggled={this.state.state === 'lumens'} />
    )
  }
}
