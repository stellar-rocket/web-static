import React from 'react'
import Classnames from 'classnames'

import RocketOffIcon from '../images/icons/rocket3.svg'
import RocketOnIcon from '../images/icons/rocket4.svg'
import ExplosionIcon from '../images/icons/explosion.svg'
import EarthIcon from '../images/icons/terre.svg'
import MoonIcon from '../images/icons/lune.svg'
import MarsIcon from '../images/icons/mars.svg'
import JupiterIcon from '../images/icons/jupiter.svg'
import SaturneIcon from '../images/icons/saturne.svg'
import UranusIcon from '../images/icons/uranus.svg'
import NeptuneIcon from '../images/icons/neptune.svg'
import GalaxyIcon from '../images/icons/galaxy.svg'
import BlackholeIcon from '../images/icons/blackhole.svg'
import Satellite1Icon from '../images/icons/satellite1.svg'
import Satellite2Icon from '../images/icons/satellite2.svg'
import Satellite3Icon from '../images/icons/satellite3.svg'
import Satellite4Icon from '../images/icons/satellite4.svg'
import Space from './objects/space'

import style from './gameBoard.css'

export default class CrashAnimation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      asCrashed: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.crashed && !this.state.asCrashed) {
      this.setState({
        asCrashed: true
      })

      this.crash()
    }

    if (!nextProps.crashed && this.state.asCrashed) {
      this.setState({
        asCrashed: false
      })
    }
  }

  crash () {

  }

  render () {
    let position = this.props.multiplicator > 100
      ? (this.props.multiplicator - 30) * -1.5
      : -100

    let rocket = (<RocketOffIcon className={style.rocket} />)

    if (this.props.multiplicator > 100) {
      rocket = (<RocketOnIcon className={style.rocket} />)
    }

    if (this.state.asCrashed) {
      rocket = (<ExplosionIcon className={style.rocket} />)
    }

    return (
      <div className={style.gameBoard}>
        <div className={style.canvas} style={{
          bottom: position
        }}>
          <Space height='100000px' />
          <GalaxyIcon className={Classnames(style.planet, style.iconGalaxy)} />
          <Space height='2000px' />
          <BlackholeIcon className={Classnames(style.planet, style.iconBlackhole)} />
          <Space height='2000px' />
          <NeptuneIcon className={Classnames(style.planet, style.iconNeptune)} />
          <Space height='350px' />
          <Satellite4Icon className={Classnames(style.planet, style.iconSatellite)} />
          <Space height='350px' />
          <UranusIcon className={Classnames(style.planet, style.iconUranus)} />
          <Space height='350px' />
          <Satellite3Icon className={Classnames(style.planet, style.iconSatellite)} />
          <Space height='350px' />
          <SaturneIcon className={Classnames(style.planet, style.iconSaturne)} />
          <Space height='250px' />
          <Satellite2Icon className={Classnames(style.planet, style.iconSatellite)} />
          <Space height='250px' />
          <JupiterIcon className={Classnames(style.planet, style.iconJupiter)} />
          <Space height='250px' />
          <Satellite1Icon className={Classnames(style.planet, style.iconSatellite)} />
          <Space height='250px' />
          <MarsIcon className={Classnames(style.planet, style.iconMars)} />
          <Space height='200px' />
          <MoonIcon className={Classnames(style.planet, style.iconMoon)} />
          <Space height='30px' />
          <EarthIcon className={Classnames(style.planet, style.iconEarth)} />
          <Space height='100px' />
        </div>
        {rocket}
      </div>
    )
  }
}
