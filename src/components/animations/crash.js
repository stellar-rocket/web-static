import React from 'react'
import Classnames from 'classnames'

import Socket from '../../lib/socket'
import GameBoard from './gameBoard'

import style from './crash.css'

export default class CrashAnimation extends React.Component {
  constructor (props) {
    super(props)

    this.socket = new Socket()

    this.state = {
      multiplicator: 0.00,
      crashed: false,
      started: false
    }
  }

  componentDidMount () {
    this.initSocket()
  }

  initSocket () {
    this.socket.on('crash:begin', (data) => {
      this.setState({
        crashed: false,
        started: false
      })
    })

    this.socket.on('crash:value', (multiplicator) => {
      this.setState({
        multiplicator: multiplicator,
        started: multiplicator >= 100
      })
    })

    this.socket.on('crash:end', (data) => {
      this.setState({
        crashed: true,
        multiplicator: data.multiplicator
      })
    })
  }

  getMultiplicator () {
    let className = style.multiplicator

    if (this.state.crashed) {
      className = Classnames(className, style.multiplicatorCrashed)
    } else if (this.state.started) {
      className = Classnames(className, style.multiplicatorStarted)
    }

    let multiplicator

    if (this.state.multiplicator >= 100) {
      multiplicator = `x${(this.state.multiplicator / 100).toFixed(2)}`
    } else {
      multiplicator = `${((100 - this.state.multiplicator) / 10).toFixed(2)}s`
    }

    return (
      <div className={className}>
        {multiplicator}
      </div>
    )
  }
  render () {
    return (
      <div className={style.crash}>
        <GameBoard
          crashed={this.state.crashed}
          multiplicator={this.state.multiplicator} />
        {this.getMultiplicator()}
      </div>
    )
  }
}
