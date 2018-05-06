import React from 'react'
import Classnames from 'classnames'

import StellarUtils from '../../lib/stellar'
import UserAPI from '../../lib/api/user'
import DepositWithdrawForm from '../forms/depositWithdraw'
import TransactionsList from '../lists/transaction'
import FormatLumensForm from '../forms/formatLumens'

import style from './account.css'

export default class AccountInfo extends React.Component {
  constructor (props) {
    super(props)

    this.userAPI = new UserAPI()
    this.stellarUtils = new StellarUtils()

    this.state = {
      user: {
        username: '',
        email: '',
        wallet: {
          balance: 0,
          locked: false
        }
      }
    }
  }

  componentDidMount () {
    this.userAPI.get().then((user) => {
      this.setState({
        user: user
      })
    })
  }

  render () {
    return (
      <div className={style.infos}>
        <h1 className={style.title}>Informations</h1>
        <div className={Classnames(style.section, style.general)}>
          <h2 className={style.subTitle}>General</h2>
          <ul className={style.list}>
            <li><label>Username</label><span>{this.state.user.username}</span></li>
            <li><label>Email</label><span>{this.state.user.email}</span></li>
          </ul>
        </div>
        <div className={Classnames(style.section, style.wallet)}>
          <h2 className={style.subTitle}>Wallet</h2>
          <ul className={style.list}>
            { this.state.user.wallet.locked
              ? <li><label>Status</label><span className={style.locked}>Locked</span></li>
              : null }
            <li><label>Balance</label><span>{this.stellarUtils.formatLumens(this.state.user.wallet.balance)}</span></li>
            <li><FormatLumensForm forceUpdate={this.forceUpdate.bind(this)} /></li>
          </ul>
          <DepositWithdrawForm wallet={this.state.user.wallet} />
        </div>
        <div className={Classnames(style.section, style.transactions)}>
          <h2 className={style.subTitle}>Transactions</h2>
          <TransactionsList />
        </div>
      </div>
    )
  }
}
