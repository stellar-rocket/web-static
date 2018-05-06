import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'

import StellarUtils from '../../../lib/stellar'

import style from './autoCheckout.css'

export default class AutoBetSubForm extends React.Component {
  constructor (props) {
    super(props)

    this.stellarUtils = new StellarUtils()

    this.state = {
      betValue: parseInt(window.localStorage.getItem('crash:bet:value')) || 1,
      multiplicatorValue: parseFloat(window.localStorage.getItem('crash:bet:mult')) || 2.00,
      asBet: props.asBet,
      maxBet: this.stellarUtils.getUnit() === 'stroops'
        ? props.maxBet
        : props.maxBet / this.stellarUtils.moneyFactor()
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      asBet: props.asBet
    })
  }

  handleBetChange (e) {
    this.setState({
      betValue: e.target.value
    })

    window.localStorage.setItem('crash:bet:value', e.target.value)
  }

  handleMultChange (e, value) {
    this.setState({
      multiplicatorValue: value
    })

    window.localStorage.setItem('crash:bet:mult', value)
  }

  handleBetSubmit (e) {
    e.preventDefault()
    e.stopPropagation()

    this.bet(this.state.betValue, this.state.multiplicatorValue)
  }

  bet () {
    this.props.submitBet(this.state.betValue, this.state.multiplicatorValue * 100)
    this.setState({
      asBet: true
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
          errorText={
            this.state.betValue > this.state.maxBet
              ? `You bet too much. Max_bet = ${this.state.maxBet} ${this.stellarUtils.getUnit()}`
              : null
          }
          type='number'
          id='betValue'
          floatingLabelText={`Bet amount (${this.stellarUtils.getUnit()})`} />
        <div>
          <label className={style.label}>Multiplicator x{this.state.multiplicatorValue}</label>
          <Slider
            className={style.slider}
            defaultValue={2.00}
            disabled={this.props.balance <= 0 || this.state.asBet}
            value={this.state.multiplicatorValue}
            onChange={this.handleMultChange.bind(this)}
            min={1.01} max={10.00}
            id='multValue' />
        </div>
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
