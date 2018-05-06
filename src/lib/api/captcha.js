import API from './index'

export default class captchaAPI {
  constructor () {
    this.api = new API('captcha')
  }

  getClientKey () {
    return this.api.get('sitekey')
  }
}
