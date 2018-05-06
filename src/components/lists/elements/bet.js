import React from 'react'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Classnames from 'classnames'

import UserAPI from '../../../lib/api/user'

import style from './bet.css'

export default class BetListElement extends React.Component {
  constructor (props) {
    super(props)

    this.userApi = new UserAPI()
    this.state = {
      user: {
        avatar: '',
        username: '',
        _id: null
      }
    }

    this.getUser(this.props.bet.user)
  }

  componentWillReceiveProps (props) {
    if (props.bet.user !== this.state.user._id) {
      this.state.user._id = props.bet.user
      this.getUser(props.bet.user)
    }
  }

  getUser (uid) {
    this.userApi.get(uid).then((user) => {
      this.setState({
        user
      })
    })
  }

  isClosed () {
    return Boolean(this.props.bet.profit)
  }

  getPrimarytext () {
    return (
      <div className={style.text}>
        <div className={style.username}>{this.state.user.username}</div>
        <div className={style.multiplicator}>x{this.props.bet.multiplicator / 100}</div>
      </div>
    )
  }

  getRightValue () {
    let rightValueClass = style.rightValue
    if (this.isClosed()) {
      rightValueClass = Classnames(rightValueClass, this.props.bet.profit >= 0 ? style.profit : style.deficit)
      return (
        <i
          className={rightValueClass}>
          {this.props.bet.profit}
        </i>
      )
    }

    return (<i className={rightValueClass}>{this.props.bet.amount}</i>)
  }

  render () {
    let itemStyle = style.item
    if (this.isClosed()) {
      itemStyle = Classnames(itemStyle, this.props.bet.profit >= 0
        ? style.itemProfit
        : style.itemDeficit
      )
    }

    return (
      <ListItem
        leftAvatar={<Avatar src={this.state.user.avatar} />}
        primaryText={this.getPrimarytext()}
        rightIcon={this.getRightValue()}
        className={itemStyle} />
    )
  }
}
