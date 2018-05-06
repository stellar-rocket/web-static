import React from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import AuthAPI from '../../lib/api/auth'
import Captcha from './captcha'

import style from './default.css'

export default class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.authAPI = new AuthAPI()

    this.state = {
      username_valid: true,
      username_value: '',
      password_valid: true,
      password_value: '',
      captchaHash: null
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    e.stopPropagation()

    if (this.checkInputs()) {
      this.authAPI.login({
        username: this.state.username_value,
        password: this.state.password_value,
        captchaHash: this.state.captchaHash
      }).then((res) => {
        if (res.err) {
          return this.setState({
            username_valid: false,
            password_valid: false
          })
        }

        this.props.bypassLogin()
      }).catch((err) => {
        console.error(err)
        return this.setState({
          username_valid: false,
          password_valid: false
        })
      })
    }
  }

  redirectOut () {
    if (window.location.pathname.match(/\/(login)(\.html)?/)) {
      window.location.pathname = '/crash'
    } else {
      window.location.reload()
    }
  }

  checkInputs () {
    this.setState({
      username_valid: this.state.username_value.length > 0,
      password_valid: this.state.password_value.length > 0
    })

    return this.state.username_value.length > 0 && this.state.password_value.length > 0
  }

  handleChange (e) {
    window.location.hash = '#register'
  }

  handleUsernameChange (e) {
    this.setState({
      username_value: e.target.value,
      username_valid: e.target.value.length > 0
    })
  }

  handlePasswordChange (e) {
    this.setState({
      password_value: e.target.value,
      password_valid: e.target.value.length > 0
    })
  }

  handleCaptchaChange (hash) {
    this.setState({
      captchaHash: hash
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          id='username'
          type='text'
          floatingLabelText='Username'
          onChange={this.handleUsernameChange.bind(this)}
          value={this.state.username_value}
          errorText={this.state.username_valid === false ? 'Invalid Username' : null} />
        <TextField
          id='password'
          type='password'
          floatingLabelText='Password'
          onChange={this.handlePasswordChange.bind(this)}
          value={this.state.password_value}
          errorText={this.state.password_valid === false ? 'Invalid Password' : null} />
        <Captcha
          className={style.recaptcha}
          handleCaptchaChange={this.handleCaptchaChange.bind(this)} />
        <div className={style.buttons}>
          <FlatButton
            className={style.changeButton}
            label='Register'
            secondary
            onClick={this.handleChange.bind(this)} />
          <RaisedButton
            className={style.submitButton}
            label='Log in'
            primary
            disabled={!this.state.captchaHash}
            onClick={this.handleSubmit.bind(this)} />
        </div>
      </form>
    )
  }
}
