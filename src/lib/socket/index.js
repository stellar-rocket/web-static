import SocketIoClient from 'socket.io-client'

const BASE_URL = '/api'

export default class Socket {
  constructor () {
    this.socket = SocketIoClient.connect(
      window.location.origin,
      {
        path: BASE_URL + '/socket.io',
        transports: ['websocket'],
        secure: window.location.protocol === 'https:'
      })
  }

  on (event, callback) {
    this.socket.on(event, callback)
  }

  emit (event, data, callback) {
    this.socket.emit(event, data, callback)
  }
}
