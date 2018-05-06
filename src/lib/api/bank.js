import API from './index'

export default class userAPI {
  constructor () {
    this.api = new API('wallet')
  }

  getStellarRocketAddress (id) {
    return this.api.get('stellarRocketAddress')
  }

  withdraw (address, amount, captchaHash) {
    return this.api.post('withdraw', {
      address,
      amount,
      captchaHash
    })
  }
}
