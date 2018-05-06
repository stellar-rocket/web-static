import React from 'react'

import BetList from '../lists/bet'
import BetForm from '../forms/bet'
import LastCrashList from '../lists/lastCrash'
import CrashAnimation from '../animations/crash'

import style from './crash.css'

export default class CrashPage extends React.Component {
  render () {
    return (
      <div id='account' className={style.page}>
        <div className={style.leftPane}>
          <div className={style.topLeftPane}>
            <CrashAnimation />
          </div>
          <div className={style.bottomLeftPane}>
            <LastCrashList />
          </div>
        </div>
        <div className={style.rightPane}>
          <div className={style.topRightPane}>
            <BetForm />
          </div>
          <div className={style.bottomRightPane}>
            <BetList />
          </div>
        </div>
      </div>
    )
  }
}
