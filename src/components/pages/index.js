import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import RocketIcon from '../images/icons/rocket.svg'

import style from './index.css'

export default class IndexPage extends React.Component {
  redirectLogin () {
    this.props.setPath('/login#login')
  }

  redirectRegister () {
    this.props.setPath('/login#register')
  }

  render () {
    return (
      <div id='index' className={style.page}>
        <h1 className={style.title}>Stellar Rocket</h1>
        <h3 className={style.subtitle}>A Stellar crash gambling game !</h3>
        <RocketIcon className={style.rocket} />
        <div className={style.forms}>
          <RaisedButton
            label='Register'
            primary
            onClick={this.redirectRegister.bind(this)} />
          <p className={style.buttonSpacer}>or</p>
          <FlatButton
            label='Login'
            secondary
            onClick={this.redirectLogin.bind(this)} />
        </div>
      </div>
    )
  }
}
