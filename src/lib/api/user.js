import API from './index'

export default class userAPI {
  constructor () {
    this.api = new API('user')
  }

  get (id) {
    if (id) {
      return this.api.get(id)
    } else {
      return this.api.get('')
    }
  }
}
