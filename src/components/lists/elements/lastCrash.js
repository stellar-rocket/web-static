import React from 'react'
import { ListItem } from 'material-ui/List'
import Classnames from 'classnames'
import style from './lastCrash.css'

export default class LastCrashElement extends React.Component {
  constructor (props) {
    super(props)

    this.avatar = ''
  }

  getPrimarytext () {
    return (
      <div className={style.text}>
        {this.props.crash.hash}
      </div>
    )
  }

  getLeftValue () {
    return (
      <i
        className={style.leftValue}>
        {`${this.props.crash.metadata.runId}.${this.props.crash.metadata.position}`}
      </i>
    )
  }

  getRightValue () {
    let rightValueClass = Classnames(style.rightValue, this.props.crash.multiplicator >= 200 ? style.profit : style.deficit)
    return (
      <i
        className={rightValueClass}>
        x{this.props.crash.multiplicator / 100}
      </i>
    )
  }

  render () {
    let itemStyle = Classnames(style.item, this.props.crash.multiplicator >= 200
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
