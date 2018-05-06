import React from 'react'
import Classnames from 'classnames'

import DepositForm from './subforms/deposit'
import WithdrawForm from './subforms/withdraw'

import style from './depositWithdraw.css'

export default class DepositWithdrawForm extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <div className={Classnames(style.section, style.deposit)}>
          <DepositForm wallet={this.props.wallet} />
        </div>
        { !this.props.wallet.locked
          ? <div className={Classnames(style.section, style.withdraw)}>
            <WithdrawForm wallet={this.props.wallet} />
          </div>
          : null }
      </div>
    )
  }
}
