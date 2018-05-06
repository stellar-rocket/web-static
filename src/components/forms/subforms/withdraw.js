import React from 'react'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'

import StellarUtils from '../../../lib/stellar'
import BankAPI from '../../../lib/api/bank'
import Captcha from '../captcha'

import style from './withdraw.css'

const MIN_WITHDRAW = 10

export default class WithdrawForm extends React.Component {
  constructor (props) {
    super(props)
    this.bankAPI = new BankAPI()
    this.stellarUtils = new StellarUtils()

    this.state = {
      withdrawAddress: '',
      withdrawAddressValid: true,
      withdrawAmount: MIN_WITHDRAW,
      withdrawAmountValid: true,
      withdrawDialogOpen: false,
      maxWithdraw: MIN_WITHDRAW,
      snackBar: {
        open: false,
        message: ''
      },
      captchaHash: null
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      maxWithdraw: (props.wallet.balance / this.stellarUtils.moneyFactor())
    })
  }

  isWithdrawAddressValid (address) {
    return address.length === 56 && address[0] === 'G'
  }

  handleAddressChange (e) {
    this.setState({
      withdrawAddress: e.target.value,
      withdrawAddressValid: this.isWithdrawAddressValid(e.target.value)
    })
  }

  handleAmountChange (e) {
    this.setState({
      withdrawAmount: e.target.value,
      withdrawAmountValid: e.target.value >= MIN_WITHDRAW &&
      e.target.value <= this.state.maxWithdraw
    })
  }

  showWithdrawDialog () {
    this.setState({
      withdrawDialogOpen: true
    })
  }

  handleWithdrawDialogClose (e) {
    this.setState({
      withdrawDialogOpen: false
    })
  }

  handleWithdrawSubmit (e) {
    if (this.state.withdrawAddressValid && this.state.withdrawAmountValid) {
      this.showWithdrawDialog()
    }
  }

  withdraw () {
    let withdrawAmount = this.state.withdrawAmount * this.stellarUtils.moneyFactor()
    this.bankAPI.withdraw(this.state.withdrawAddress, withdrawAmount, this.state.captchaHash).then(() => {
      this.handleWithdrawDialogClose()
      this.setState({
        withdrawAddress: '',
        withdrawAddressValid: true,
        withdrawAmount: MIN_WITHDRAW,
        withdrawAmountValid: true,
        withdrawDialogOpen: false
      })

      this.snack('Withdraw submited', 10000)
    }).catch((err) => {
      this.handleWithdrawDialogClose()
      this.snack(err.responseJSON.err, 5000)
    })
  }

  snack (message, time) {
    setTimeout(() => {
      this.setState({
        snackBar: {
          open: false,
          message: ''
        }
      })
    }, time)
    return this.setState({
      snackBar: {
        open: true,
        message: message
      }
    })
  }

  handleCaptchaChange (hash) {
    this.setState({
      captchaHash: hash
    })
  }

  render () {
    return (
      <div>
        <Subheader className={style.subTitle}>Withdraw</Subheader>
        <form className={style.form}
          onSubmit={this.handleWithdrawSubmit.bind(this)} >
          <TextField
            className={style.input}
            id='destination'
            type='text'
            onChange={this.handleAddressChange.bind(this)}
            floatingLabelText='Withdraw address'
            value={this.state.withdrawAddress}
            errorText={
              this.state.withdrawAddressValid
                ? null
                : 'Invalid address'
            } />
          <TextField
            className={style.input}
            id='amount'
            type='number'
            onChange={this.handleAmountChange.bind(this)}
            value={this.state.withdrawAmount}
            min={MIN_WITHDRAW} max={this.state.maxWithdraw}
            floatingLabelText='Amount (lumens)'
            errorText={
              this.state.withdrawAmountValid
                ? null
                : `Invalid amount. Should be between ${MIN_WITHDRAW} and ${this.state.maxWithdraw} lumens`
            } />
          <Captcha handleCaptchaChange={this.handleCaptchaChange.bind(this)} />
          <RaisedButton
            primary
            className={style.submitButton}
            onClick={this.handleWithdrawSubmit.bind(this)}
            disabled={!this.state.captchaHash}
            id='withdrawButton'
            label='Withdraw' />
        </form>
        <Dialog
          actions={[
            <FlatButton
              label='No'
              primary
              onClick={this.handleWithdrawDialogClose.bind(this)} />,
            <FlatButton
              label='Yes'
              primary
              onClick={this.withdraw.bind(this)} />
          ]}
          modal={false}
          open={this.state.withdrawDialogOpen}
          onRequestClose={this.handleWithdrawDialogClose.bind(this)} >
          <p>
            { `Confirm withdraw of ${this.state.withdrawAmount} lumens to ${this.state.withdrawAddress}`}
          </p>
        </Dialog>
        <Snackbar
          className={style.snackbar}
          message={this.state.snackBar.message}
          open={this.state.snackBar.open} />
      </div>)
  }
}
