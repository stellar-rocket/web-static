import API from './index'

export default class faucetAPI {
  constructor () {
    this.api = new API('faucet')
  }

  claim (opts) {
    return this.api.post('', opts)
  }
}
