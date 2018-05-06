import React from 'react'

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import UserApi from '../../lib/api/user'

import style from './chip.css'

export default class UserChip extends React.Component {
  constructor (props) {
    super(props)

    this.userAPI = new UserApi()

    this.state = {
      image: '',
      username: ''
    }

    this.init()
  }

  init () {
    this.userAPI.get().then((data) => {
      this.setState({
        avatar: data.avatar,
        username: data.username
      })
    })
  }

  handleClick () {
    this.props.setPath('/account')
  }

  render () {
    return (
      <Chip
        className={style.chip}
        onClick={this.handleClick.bind(this)}>
        <Avatar src={this.state.avatar} />
        {this.state.username}
      </Chip>
    )
  }
}
