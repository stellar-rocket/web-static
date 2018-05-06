import React from 'react'

import BlackHoleIcon from '../images/icons/blackhole.svg'
import FooterPage from './footer'

import style from './error.css'

export default class ErrorPage extends React.Component {
  setPath (path) {
    window.location = path
  }

  render () {
    return (
      <div id='error' className={style.page}>
        <div className={style.error}>
          <h1 className={style.title}>Are you lost ?</h1>
          <h2 className={style.subtitle}>
            <a href='/crash'>Get back to the space station</a>
          </h2>
          <BlackHoleIcon className={style.image} />
        </div>
        <FooterPage setPath={this.setPath.bind(this)} />
      </div>
    )
  }
}
