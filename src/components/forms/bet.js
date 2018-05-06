import React from 'react'
import Subheader from 'material-ui/Subheader'
import Snackbar from 'material-ui/Snackbar'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'

import StellarUtils from '../../lib/stellar'
import BetSubForm from './subforms/bet'
import AutoCheckoutSubForm from './subforms/autoCheckout'
import CheckoutForm from './subforms/checkout'
import UserAPI from '../../lib/api/user'
import Socket from '../../lib/socket/index'

import style from './bet.css'

// A modifier dans frontend --> utils/crash.js
var MAX_BET = 1000

export default class BetForm extends React.Component {
  constructor (props) {
    super(props)

    this.userAPI = new UserAPI()
    this.stellarUtils = new StellarUtils()
    this.socket = new Socket()

    this.state = {
      balance: 0,
      runId: 0,
      position: 0,
      asBet: false,
      canBet: false,
      selectedPane: 0,
      snackBar: {
        open: false,
        message: ''
      }
    }

    this.initUser()
  }

  componentDidMount () {
    this.initSocket()
  }

  initUser () {
    this.userAPI.get('').then((user) => {
      this.setState({
        userId: user._id,
        balance: parseInt(user.wallet.balance || 0)
      })
    })
  }

  initSocket () {
    this.socket.on('client:ready', (data) => {
      MAX_BET = data.maxBet
      this.setState({
        runId: data.metadata.runId,
        position: data.metadata.position,
        asBet: false,
        canBet: data.multiplicator < 100
      })
    })

    this.socket.on('crash:begin', (crash) => {
      this.setState({
        runId: crash.metadata.runId,
        position: crash.metadata.position,
        asBet: false,
        canBet: true
      })
    })

    this.socket.on('crash:value', (multiplicator) => {
      this.setState({
        canBet: multiplicator < 100
      })
    })

    this.socket.on('crash:checkout', (closedBets) => {
      for (let bet of closedBets) {
        if (bet.user === this.state.userId) {
          this.setState({
            balance: this.state.balance + bet.profit
          })
        }
      }
    })

    this.socket.on('client:bet:close', (bet) => {
      if (bet.user === this.state.userId) {
        this.setState({
          asBet: false
        })
      }
    })
  }

  submitBet (amount, multiplicator) {
    return new Promise((resolve, reject) => {
      if (this.state.asBet) {
        reject(new Error('Already bet'))
        return
      }

      this.socket.emit('client:bet:open', {
        runId: this.state.runId,
        position: this.state.position,
        amount,
        multiplicator
      }, (err, response) => {
        if (err) {
          return this.snack(err, 5000)
        }
        this.setState({
          asBet: true
        })
        resolve(response)
      })
    })
  }

  closeBet () {
    return new Promise((resolve, reject) => {
      if (!this.state.asBet) {
        return this.snack('No bet placed', 5000)
      }

      this.socket.emit('client:bet:close', {}, (err, response) => {
        if (err) {
          return this.snack(err, 5000)
        }
        this.setState({
          asBet: false
        })
        resolve(response)
      })
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

  getWaitingScreen () {
    let message
    if (this.state.asBet) {
      message = 'Wait until the rocket launch'
    } else {
      message = 'Wait until the next launch'
    }

    return (
      <Subheader className={style.waitscreen}>
        {message}
      </Subheader>
    )
  }

  selectPane (num) {
    this.setState({
      selectedPane: num
    })
  }

  getNavBar () {
    let BetPane = this.state.selectedPane
      ? (<AutoCheckoutSubForm
        asBet={this.state.asBet}
        socket={this.socket}
        balance={this.state.balance}
        maxBet={MAX_BET}
        submitBet={this.submitBet.bind(this)} />)
      : (<BetSubForm a
        sBet={this.state.asBet}
        balance={this.state.balance}
        maxBet={MAX_BET}
        submitBet={this.submitBet.bind(this)} />)

    return (
      <div>
        <BottomNavigation
          selectedIndex={this.state.selectedPane}
          className={style.navBar}>
          <BottomNavigationItem
            label='Bet'
            icon={
              <FontIcon className='material-icons'>local_atm</FontIcon>
            }
            onClick={() => this.selectPane(0)} />
          <BottomNavigationItem
            label='Auto Checkout'
            icon={
              <FontIcon className='material-icons'>loop</FontIcon>
            }
            onClick={() => this.selectPane(1)} />
        </BottomNavigation>
        {BetPane}
      </div>
    )
  }

  render () {
    let Pane = this.getNavBar()

    if (!this.state.canBet) {
      Pane = this.getWaitingScreen()
    }

    if (this.state.asBet && !this.state.canBet) {
      Pane = (<CheckoutForm closeBet={this.closeBet.bind(this)} />)
    }

    return (
      <div id='bet' className={style.bet}>
        <Subheader className={style.balance}>
          <label className={style.balanceLabel}>
            Balance:
          </label>
          <span className={style.balanceValue}>
            {this.stellarUtils.formatLumens(this.state.balance)}
          </span>
        </Subheader>
        {Pane}
        <Snackbar
          className={style.snackbar}
          message={this.state.snackBar.message}
          open={this.state.snackBar.open} />
      </div>
    )
  }
}
