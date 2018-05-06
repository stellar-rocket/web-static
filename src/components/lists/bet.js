import React from 'react'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import BetListElement from './elements/bet'
import Socket from '../../lib/socket'

import style from './bet.css'

export default class BetList extends React.Component {
  constructor (props) {
    super(props)

    this.socket = new Socket()

    this.state = {
      bets: [],
      runId: 0,
      position: 0
    }
  }

  componentDidMount () {
    this.initSocket()
  }

  initSocket () {
    this.socket.on('crash:begin', this.resetBetList.bind(this))
    this.socket.on('client:bet:open', this.addBet.bind(this))
    this.socket.on('client:bet:close', this.updateBet.bind(this))
    this.socket.on('client:ready', (data) => {
      this.setBetMetadata(data)
      let array = data.bets.open.concat(data.bets.closed)
      for (let bet of array) {
        this.addBet(bet)
      }
    })
  }

  setBetMetadata (crashValue) {
    if (this.state.runId !== crashValue.metadata.runId &&
      this.state.position !== crashValue.metadata.position) {
      this.setState({
        runId: crashValue.metadata.runId,
        position: crashValue.metadata.position
      })
    }
  }

  resetBetList (crashValue) {
    this.setState({
      bets: []
    })

    this.setBetMetadata(crashValue)
  }

  addBet (bet) {
    let bets = this.state.bets.slice()
    bets.push(bet)

    this.setState({
      bets: sortBets(bets)
    })
  }

  updateBet (bet) {
    let index = this.state.bets.findIndex((e) => e._id === bet._id)
    let bets = this.state.bets.slice()
    bets[index] = bet

    this.setState({
      bets: sortBets(bets)
    })
  }

  getBetItem (bet, key) {
    return (
      <BetListElement
        key={key}
        bet={bet}
      />
    )
  }

  render () {
    let betList = this.state.bets.map(this.getBetItem.bind(this))

    return (
      <List
        className={style.list}>
        <Subheader>Bets for crash n° {this.state.runId}.{this.state.position}</Subheader>
        {betList}
      </List>
    )
  }
}

function sortBets (array) {
  return array.sort((a, b) => b.amount - a.amount)
}
