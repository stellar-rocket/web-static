import React from 'react'

import AccountInfo from '../user/account'

import style from './account.css'

export default class AccountPage extends React.Component {
  render () {
    return (
      <div id='account' className={style.page}>
        <AccountInfo />
      </div>
    )
  }
}
