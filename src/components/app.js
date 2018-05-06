import React from 'react'

import IndexPage from './pages/index'
import CrashPage from './pages/crash'
import AccountPage from './pages/account'
import LoginPage from './pages/login'
import AboutPage from './pages/about'
import LoadingPage from './pages/loading'
import FooterPage from './pages/footer'
import HeaderPage from './pages/header'

import AuthAPI from '../lib/api/auth'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.authAPI = new AuthAPI()

    this.state = {
      path: '/loading',
      user: null
    }

    this.checkIfLogged()

    window.addEventListener('popstate', (state) => {
      if (state.state) {
        this.setPath(state.state, true)
      }
    })

    this.publicPath = ['/about', '/', '/login', '/loading']
  }

  checkIfLogged () {
    this.authAPI.isLogged().then((data) => {
      this.setState({
        logged: data && data !== null
      })

      this.setPath(window.location.pathname).then(() => {
        this.security(data)
      })
    })
  }

  security (logged) {
    // location.match(/\/(info|loading)(\.html)?/
    if (logged) {
      if (this.state.path.match(/\/(login)(\.html)?/)) {
        this.bypassLogin()
      }
    } else {
      if (!this.state.path.match(/\/(info|loading)(\.html)?/) && this.state.path !== '/') {
        this.setPath('/login')
      }
    }
  }

  bypassLogin () {
    this.setState({
      logged: true
    }, () => {
      this.setPath('/crash')
    })
  }

  forceLogin () {
    this.setState({
      logged: false
    }, () => {
      this.setPath('/login')
    })
  }

  isPathAllowed (path) {
    return (!this.state.logged && this.publicPath.indexOf(path) !== -1) || this.state.logged
  }

  setPath (path, preventPushState) {
    return new Promise((resolve, reject) => {
      let oldPath = this.state.path.split('#')
      let futurPath = path.split('#')

      let newPath = futurPath
      if (oldPath[0] !== futurPath[0] && futurPath[1] === '') {
        newPath[1] = ''
      }

      if (!this.isPathAllowed(newPath[0])) {
        newPath[0] = '/login'
      }
      if (!preventPushState) {
        window.history.pushState(newPath[0], 'Stellar Rocket', newPath.join('#'))
      }

      return this.setState({
        path: newPath[0]
      }, resolve)
    })
  }

  render () {
    var Route
    switch (this.state.path) {
      default:
      case '/index':
      case '/index.html':
        Route = (<IndexPage setPath={this.setPath.bind(this)} />)
        break
      case '/crash':
      case '/crash.html':
        Route = (<CrashPage />)
        break
      case '/account':
      case '/account.html':
        Route = (<AccountPage />)
        break
      case '/login':
      case '/login.html':
        Route = (<LoginPage bypassLogin={this.bypassLogin.bind(this)} />)
        break
      case '/about':
      case '/about.html':
        Route = (<AboutPage />)
        break
      case '/loading':
        Route = (<LoadingPage />)
    }

    return (
      <div className='app'>
        <HeaderPage setPath={this.setPath.bind(this)} forceLogin={this.forceLogin.bind(this)} logged={this.state.logged} />
        {Route}
        <FooterPage setPath={this.setPath.bind(this)} />
      </div>
    )
  }
}
