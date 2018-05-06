import API from './index'

export default class AuthAPI {
  constructor () {
    this.api = new API('auth')
  }

  login (opts) {
    return new Promise((resolve, reject) => {
      if (!opts) return reject(new Error('Missing arguments'))
      if (!opts.username) return reject(new Error('Mission username arguments'))
      if (!opts.password) return reject(new Error('Mission password arguments'))

      this.api.post('login', opts).then(resolve).catch(reject)
    })
  }

  isLogged () {
    return this.api.get('isLogged')
  }

  logout (opts) {
    return this.api.post('logout')
  }

  register (opts) {
    return new Promise((resolve, reject) => {
      if (!opts) return reject(new Error('Missing arguments'))
      if (!opts.username) return reject(new Error('Mission username arguments'))
      if (!opts.password) return reject(new Error('Mission password arguments'))

      this.api.post('register', opts).then(resolve).catch(reject)
    })
  }

  changePass (opts) {
    return new Promise((resolve, reject) => {
      if (!opts) return reject(new Error('Missing arguments'))
      if (!opts.username) return reject(new Error('Mission username arguments'))
      if (!opts.oldpassword) return reject(new Error('Mission oldpassword arguments'))
      if (!opts.newpassword) return reject(new Error('Mission newpassword arguments'))

      this.api.post('changepass', opts).then(resolve).catch(reject)
    })
  }
}
