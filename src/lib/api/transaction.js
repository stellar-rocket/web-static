import API from './index'

export default class transactionAPI {
  constructor () {
    this.api = new API('transaction')
  }

  get () {
    return this.api.get('')
  }
}
