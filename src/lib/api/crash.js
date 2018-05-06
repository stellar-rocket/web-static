import API from './index'

export default class userAPI {
  constructor () {
    this.api = new API('crash')
  }

  getLastCrashs (from) {
    if (from) {
      return this.api.get(`current/${from}`)
    } else {
      return this.api.get('current/')
    }
  }

  getLastRun (from) {
    if (from) {
      return this.api.get(`lasts/${from}`)
    } else {
      return this.api.get('lasts/')
    }
  }
}
