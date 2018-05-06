import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'

import style from './checkout.css'

export default class CheckoutSubForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  handleBetClose (e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.closeBet()
  }

  render () {
    return (
      <form id='checkout'
        className={style.form}
        onSubmit={this.handleBetClose.bind(this)}>
        <RaisedButton
          className={style.button}
          label='Cash Out'
          primary
          onClick={this.handleBetClose.bind(this)} />
      </form>
    )
  }
}
