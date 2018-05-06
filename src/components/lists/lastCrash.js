import React from 'react'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import LastCrashListElement from './elements/lastCrash'
import Socket from '../../lib/socket'
import CrashAPI from '../../lib/api/crash'
import CrashLib from '../../lib/crash'

import style from './lastCrash.css'

export default class LastCrashList extends React.Component {
  constructor (props) {
    super(props)

    this.socket = new Socket()
    this.crashAPI = new CrashAPI()
    this.crashLib = new CrashLib()
    this.state = {
      lastCrashs: []
    }

    this.getLatestCrash()
  }

  componentDidMount () {
    this.initSocket()
  }

  getLatestCrash () {
    this.crashAPI.getLastCrashs().then((crashs) => {
      this.setState({
        lastCrashs: sortCrash(crashs.map((crash) => {
          return {
            hash: crash.value,
            multiplicator: this.crashLib.calculateCrashPoint(crash.value),
            metadata: {
              runId: crash.runId,
              position: crash.position
            }
          }
        }))
      })
    })
  }

  initSocket () {
    this.socket.on('crash:end', this.addCrash.bind(this))
  }

  addCrash (crash) {
    let lastCrashs = this.state.lastCrashs.slice()
    lastCrashs.push(crash)
    this.setState({
      lastCrashs: sortCrash(lastCrashs).slice(0, 20)
    })
  }

  getItem (crash) {
    return (
      <LastCrashListElement
        key={`${crash.metadata.runId}.${crash.metadata.position}`}
        crash={crash} />
    )
  }

  render () {
    let crashList = this.state.lastCrashs.map(this.getItem.bind(this))

    return (
      <List
        className={style.list}>
        <Subheader>Last crash values</Subheader>
        {crashList}
      </List>
    )
  }
}

function sortCrash (array) {
  return array.sort((a, b) => `${a.metadata.runId}.${a.metadata.position}` - `${b.metadata.runId}.${b.metadata.position}`)
}
