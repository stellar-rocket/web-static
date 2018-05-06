import React from 'react'

import Paper from 'material-ui/Paper'

import RocketIcon from '../images/icons/rocket.svg'
import LoginForm from '../forms/login'
import RegisterForm from '../forms/register'
import CaptchaAPI from '../../lib/api/captcha'

import style from './login.css'

export default class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.captchaAPI = new CaptchaAPI()

    this.state = {
      route: window.location.hash,
      captchaSiteKey: null
    }

    window.addEventListener('hashchange', this.handleHashChange.bind(this))
  }

  componentDidMount () {
    this.captchaAPI.getClientKey().then((key) => {
      this.setState({
        captchaSiteKey: key
      })
    })
  }

  handleHashChange () {
    try {
      this.setState({
        route: window.location.hash
      })
    } catch (e) {
      this.state.route = window.location.hash
    }
  }

  render () {
    var Route
    var routeName
    switch (this.state.route) {
      default:
      case '#login':
        Route = (
          <LoginForm
            captchaSiteKey={this.state.captchaSiteKey}
            bypassLogin={this.props.bypassLogin} />
        )
        routeName = 'Log in'
        break
      case '#register':
        Route = (
          <RegisterForm
            captchaSiteKey={this.state.captchaSiteKey}
            bypassLogin={this.props.bypassLogin} />
        )
        routeName = 'Register '
        break
    }

    return (
      <div id='login' className={style.page}>
        <Paper
          rounded
          zDepth={2}
          className={style.paper}>
          <RocketIcon className={style.rocket} />
          <h2 className={style.title}>{routeName}to Stellar Rocket</h2>
          {Route}
        </Paper>
      </div>
    )
  }
}
