import React from 'react'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Classnames from 'classnames'

import StellarUtils from '../../../lib/stellar'
import style from './transaction.css'

export default class TransactionListElement extends React.Component {
  constructor (props) {
    super(props)

    this.setllarUtils = new StellarUtils()
  }

  getPrimarytext () {
    return (
      <div className={style.text}>
        <div className={style.type}>
          {this.props.transaction.type}
        </div>
        <div className={style.date}>
          {(new Date(this.props.transaction.date)).toLocaleString()}
        </div>
      </div>
    )
  }

  getRightValue () {
    let rightValueClass = style.rightValue
    switch (this.props.transaction.status) {
      case 'done':
        rightValueClass = Classnames(rightValueClass, style.done)
        break
      case 'processing':
      case 'progress':
        rightValueClass = Classnames(rightValueClass, style.progress)
        break
      case 'refused':
        rightValueClass = Classnames(rightValueClass, style.refused)
        break
    }
    return (
      <i
        className={rightValueClass}>
        {this.props.transaction.status}
      </i>
    )
  }

  getLeftValue () {
    let leftValueClass = style.leftValue
    leftValueClass = Classnames(leftValueClass, this.props.transaction.type === 'deposit' ? style.profit : style.deficit)
    return (
      <i
        className={leftValueClass}>
        {this.setllarUtils.formatLumens(this.props.transaction.amount)}
      </i>
    )
  }

  render () {
    let itemStyle = style.item
    itemStyle = Classnames(itemStyle, this.props.transaction.type === 'deposit'
      ? style.itemProfit
      : style.itemDeficit
    )

    return (
      <ListItem
        leftAvatar={this.getLeftValue()}
        primaryText={this.getPrimarytext()}
        rightIcon={this.getRightValue()}
        className={itemStyle} />
    )
  }
}
