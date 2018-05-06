import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'

import FaucetAPI from '../../lib/api/faucet'
import Captcha from '../forms/captcha'

import style from './faucet.css'

export default class FaucetForm extends React.Component {
  constructor (props) {
    super(props)

    this.faucetAPI = new FaucetAPI()

    this.state = {
      faucetOpen: false,
      captchaHash: null,
      snackBar: {
        open: false,
        message: '',
        err: false
      }
    }
  }

  handleFaucetOpen (e) {
    this.setState({
      faucetOpen: true
    })
  }

  handleFaucetClose () {
    this.setState({
      faucetOpen: false
    })
  }

  handleCaptchaChange (hash) {
    this.setState({
      captchaHash: hash
    })
  }

  handFaucetClaim () {
    this.faucetAPI.claim({
      captchaHash: this.state.captchaHash
    }).then((res) => {
      this.snack(`Claimed ${res.faucet.amount} stroops`, 5000, false)
    }).catch((err) => {
      this.snack(`Failed to claim faucet : ${err.responseJSON.err}`, 5000, true)
    })
  }

  snack (message, time, err) {
    setTimeout(() => {
      this.setState({
        snackBar: {
          open: false,
          message: '',
          err
        }
      })
    }, time)
    return this.setState({
      snackBar: {
        open: true,
        message: message,
        err
      }
    })
  }

  render () {
    return (
      <span>
        <RaisedButton
          className={style.faucetButton}
          label='Claim faucet'
          primary
          onClick={this.handleFaucetOpen.bind(this)} />
        <Dialog
          open={this.state.faucetOpen}
          onRequestClose={this.handleFaucetClose.bind(this)}>
          <Captcha handleCaptchaChange={this.handleCaptchaChange.bind(this)} />
          <RaisedButton
            className={style.claimButton}
            label='Claim'
            primary
            disabled={!this.state.captchaHash}
            onClick={this.handFaucetClaim.bind(this)} />
        </Dialog>
        <Snackbar
          className={this.state.err ? style.snackbar : style.snackbarErr}
          message={this.state.snackBar.message}
          open={this.state.snackBar.open} />
      </span>
    )
  }
}
