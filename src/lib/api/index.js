import $ from 'jquery'

const BASE_URL = '/api'

export default class API {
  constructor (module) {
    this.baseUrl = BASE_URL
    this.module = module
  }

  get (endPoint) {
    return this.request('GET', endPoint)
  }

  post (endPoint, data) {
    return this.request('POST', endPoint, data)
  }

  delete (endPoint) {
    return this.request('DELETE', endPoint)
  }

  put (endPoint, data) {
    return this.request('PUT', endPoint, data)
  }

  request (method, endPoint, data) {
    return new Promise((resolve, reject) => {
      let url = `${this.baseUrl}/${this.module}/${endPoint}`

      $.ajax({
        method,
        url,
        data,
        success: resolve,
        error: reject
      })
    })
  }
}
