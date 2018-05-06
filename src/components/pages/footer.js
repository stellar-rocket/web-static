import React from 'react'

import style from './footer.css'

export default class FooterPage extends React.Component {
  handleClickInfo (e) {
    e.preventDefault()
    e.stopPropagation()

    let page = e.target.id
    this.props.setPath(`/${page}`)
  }

  render () {
    return (
      <div id='footer' className={style.page}>
        <ul className={style.list}>
          <li
            id='about'
            onClick={this.handleClickInfo.bind(this)}>
            <a
              id='about'
              href='/about'>About</a>
          </li>
        </ul>
      </div>
    )
  }
}
