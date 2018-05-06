import React from 'react'

import LinearProgress from 'material-ui/LinearProgress'

import RocketIcon from '../images/icons/rocket2.svg'

import style from './loading.css'

export default class LoadingPage extends React.Component {
  render () {
    return (
      <div id='loading' className={style.page}>
        <RocketIcon />
        <h1 className={style.title}>Loading</h1>
        <LinearProgress className={style.progress} />
      </div>
    )
  }
}
