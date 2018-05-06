import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import RockerIcon from '../images/icons/rocket.svg'
import AuthAPI from '../../lib/api/auth'
import UserChip from '../user/chip'
import Faucet from '../forms/faucet'

import style from './header.css'

export default class HeaderPage extends React.Component {
  constructor (props) {
    super(props)

    this.authAPI = new AuthAPI()

    this.state = {
      logged: this.props.logged
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      logged: props.logged
    })
  }

  getLoginButton () {
    return (
      <RaisedButton
        key='loginButton'
        className={style.loginButton}
        label='Log In'
        primary
        onClick={this.props.forceLogin} />
    )
  }

  getAccountView () {
    return (
      <UserChip
        id=''
        key='userChip'
        setPath={this.props.setPath} />
    )
  }

  handleLogout () {
    this.authAPI.logout().then(() => {
      this.props.forceLogin()
    })
  }

  getLogoutButton () {
    return (
      <FlatButton
        key='logoutButton'
        className={style.logoutButton}
        label='Log out'
        secondary
        onClick={this.handleLogout.bind(this)} />
    )
  }

  handleClickGame (e) {
    e.preventDefault()
    e.stopPropagation()

    let game = e.target.id
    this.props.setPath(`/${game}`)
  }

  getGameList () {
    return (
      <ul
        key='game'
        className={style.games}>
        <li
          id='crash'
          onClick={this.handleClickGame.bind(this)}>
          <a
            id='crash'
            href='#'>
            Crash
          </a>
        </li>
      </ul>
    )
  }

  handleLogoClick (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.setPath('/')
  }

  getLogo () {
    return (
      <a
        key='logo'
        href='/'
        onClick={this.handleLogoClick.bind(this)}
        className={style.logoContainer}>
        <RockerIcon className={style.logo} />
        <span className={style.logoText}>Stellar Rocket</span>
      </a>
    )
  }

  render () {
    let children = [(<Faucet key='faucet' />), this.getLogo(), this.getGameList()]

    if (this.state.logged) {
      children.push(this.getAccountView())
      children.push(this.getLogoutButton())
    } else {
      children.push(this.getLoginButton())
    }

    return (
      <div id='header' className={style.page}>
        {children}
      </div>
    )
  }
}
