import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import StellarUtils from '../../../lib/stellar'

import style from './bet.css'

export default class BetSubForm extends React.Component {
  constructor (props) {
    super(props)

    this.stellarUtils = new StellarUtils()

    this.state = {
      betValue: parseInt(window.localStorage.getItem('crash:bet:value')) || 1,
      asBet: props.asBet,
      maxBet: this.stellarUtils.getUnit() === 'stroops'
        ? props.maxBet
        : props.maxBet / this.stellarUtils.moneyFactor()
    }
  }

  handleBetChange (e) {
    this.setState({
      betValue: e.target.value
    })
    window.localStorage.setItem('crash:bet:value', e.target.value)
  }

  handleBetSubmit (e) {
    e.preventDefault()
    e.stopPropagation()

    let betValue = this.stellarUtils.getUnit() === 'stroops'
      ? this.state.betValue
      : this.state.betValue * this.stellarUtils.moneyFactor()

    this.props.submitBet(betValue, null).then(() => {
      this.setState({
        asBet: true
      })
    })
  }

  render () {
    return (
      <form id='bet' className={style.form} onSubmit={this.handleBetSubmit.bind(this)}>
        <TextField
          className={style.input}
          disabled={this.props.balance <= 0 || this.state.asBet}
          value={this.state.betValue}
          onChange={this.handleBetChange.bind(this)}
          min='1' max={this.state.maxBet}
          type='number'
          id='betValue'
          errorText={
            this.state.betValue > this.state.maxBet
              ? `You bet too much. Max_bet = ${this.state.maxBet} ${this.stellarUtils.getUnit()}`
              : null
          }
          floatingLabelText={`Bet amount (${this.stellarUtils.getUnit()})`} />
        <RaisedButton
          className={style.submitButton}
          primary
          label='Bet'
          disabled={this.state.asBet || this.state.betValue > this.state.maxBet}
          onClick={this.handleBetSubmit.bind(this)} />
      </form>
    )
  }
}
