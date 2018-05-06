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
      email_valid: true,
      email_value: '',
      password_1_valid: true,
      password_1_value: '',
      password_2_valid: true,
      password_2_value: '',
      captchaHash: null
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    e.stopPropagation()

    if (this.checkInputs()) {
      this.authAPI.register({
        username: this.state.username_value,
        password: this.state.password_1_value,
        email: this.state.email_value,
        captchaHash: this.state.captchaHash
      }).then((res) => {
        if (res.err) {
          return this.setState({
            username_valid: false,
            password_1_valid: false,
            email_valid: false
          })
        }

        this.props.bypassLogin()
      }).catch((err) => {
        console.error(err)
        return this.setState({
          username_valid: false,
          password_1_valid: false,
          email_valid: false
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
      email_valid: this.testEmail(this.state.email_value) && this.state.email_value.length > 0,
      password_1_valid: this.state.password_1_value.length > 0,
      password_2_valid: this.state.password_2_value.length > 0
    })

    return this.state.username_value.length > 0 &&
      this.state.email_value.length > 0 &&
      this.testEmail(this.state.email_value) &&
      this.state.password_1_value.length > 0 &&
      this.state.password_2_value.length > 0
  }

  handleChange (e) {
    window.location.hash = '#login'
  }

  handleUsernameChange (e) {
    this.setState({
      username_value: e.target.value,
      username_valid: e.target.value.length > 0
    })
  }

  testEmail (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  handleEmailChange (e) {
    this.setState({
      email_value: e.target.value,
      email_valid: this.testEmail(e.target.value) && e.target.value.length > 0
    })
  }

  handlePassword1Change (e) {
    this.setState({
      password_1_value: e.target.value,
      password_1_valid: e.target.value.length > 0 && e.target.value.length >= 8
    })
  }

  handlePassword2Change (e) {
    this.setState({
      password_2_value: e.target.value,
      password_2_valid: e.target.value.length > 0 && e.target.value.length >= 8 && e.target.value === this.state.password_1_value
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
          id='email'
          type='text'
          floatingLabelText='Email'
          onChange={this.handleEmailChange.bind(this)}
          value={this.state.email_value}
          errorText={this.state.email_valid === false ? 'Invalid Email' : null} />
        <TextField
          id='username'
          type='text'
          floatingLabelText='Username'
          onChange={this.handleUsernameChange.bind(this)}
          value={this.state.username_value}
          errorText={this.state.username_valid === false ? 'Invalid Username' : null} />
        <TextField
          id='password_1'
          type='password'
          floatingLabelText='Password'
          onChange={this.handlePassword1Change.bind(this)}
          value={this.state.password_1_value}
          errorText={this.state.password_1_valid === false ? 'Invalid Password (must be 8 characters long)' : null} />
        <TextField
          id='password_2'
          type='password'
          floatingLabelText='Retype Password'
          onChange={this.handlePassword2Change.bind(this)}
          value={this.state.password_2_value}
          errorText={this.state.password_2_valid === false ? 'Passwords doesn\'t match' : null} />
        <Captcha
          className={style.recaptcha}
          handleCaptchaChange={this.handleCaptchaChange.bind(this)} />
        <div className={style.buttons}>
          <FlatButton
            className={style.changeButton}
            label='Login'
            secondary
            onClick={this.handleChange.bind(this)} />
          <RaisedButton
            className={style.submitButton}
            label='Register'
            primary
            disabled={!this.state.captchaHash}
            onClick={this.handleSubmit.bind(this)} />
        </div>
      </form>
    )
  }
}
