import React from 'react'
import Recaptcha from 'react-google-recaptcha'

import CaptchaAPI from '../../lib/api/captcha'

export default class FaucetForm extends React.Component {
  constructor (props) {
    super(props)

    this.captchaAPI = new CaptchaAPI()

    this.state = {
      captchaSiteKey: null,
      captchaHash: null
    }
  }

  componentDidMount () {
    this.captchaAPI.getClientKey().then((key) => {
      this.setState({
        captchaSiteKey: key
      })
    })
  }

  handleCaptchaChange (hash) {
    this.setState({
      captchaHash: hash
    })

    this.props.handleCaptchaChange(hash)
  }

  render () {
    if (this.state.captchaSiteKey) {
      return (
        <Recaptcha
          className={this.props.className}
          size='normal'
          sitekey={this.state.captchaSiteKey}
          onChange={this.handleCaptchaChange.bind(this)} />
      )
    } else {
      return null
    }
  }
}
