import React from 'react'

import SellarUtils from '../../lib/stellar'
import style from './about.css'

export default class InfoPage extends React.Component {
  constructor (props) {
    super(props)

    this.setllarUtils = new SellarUtils()
  }

  render () {
    return (
      <div className={style.page}>
        <div className={style.info}>
          <div className={style.section} id='faq'>
            <h2 className={style.title}>FAQ</h2>
            <div className={style.content}>
              <div className={style.answer}>
                <h3 className={style.subtitle}>What is Stellar-Rocket ?</h3>
                <p className={style.text}>
                  Stellar-Rocket is a thrilling social Stellar gambling game.
                  Its a real time, simple, and exciting game where you can securely play for fun or to win a fortune.
                  Each round of the game, you have the opportunity to place a bet before the round starts.
                  Once the round begins, a lucky multiplier starts at 1x and begins climbing higher and higher.
                  At any moment, you can click 'Cash Out' to lock in the current multiplier which awards you with your multiplied bet.
                  The longer you stay in the game before cashing out, the higher the multiplier gets.
                  But beware! Every tick of the game has a chance of crashing.
                  If you do not cash out before the crash, you lose your bet.
                  Every round is a fight between risk and reward.
                  Do you cash out at 1.1x for a conservative win ?
                  Or do you stay in the game to hunt the high 1000x multipliers ?
                </p>
              </div>
              <div className={style.answer}>
                <h3 className={style.subtitle}>How to play ?</h3>
                <p className={style.text}>
                  First you need to have a positive balance, by depositing stellar to your account.
                  Next, select the amount to bet and a cash out multiplier. Place your bet.
                  Watch the multiplier increase from 1x upwards!
                  You can cash out before your set up cash out limit, pressing the 'Cash Out' button.
                  Get your bet multiplied by that multiplier.
                  But be careful because the game can crash at any time, and you'll get nothing!
                </p>
              </div>
              <div className={style.answer}>
                <h3>What are lumens ? And stroops ?</h3>
                <p className={style.text}>
                  <strong>Lumens</strong> is the main currency in the Stellar network.
                </p>
                <p className={style.text}>
                  <strong>Stroops</strong> is the tiniest slice of a Lumen. 1 Lumen is equal to {this.setllarUtils.moneyFactor()} stroops
                </p>
              </div>
              <div className={style.answer}>
                <h3 className={style.subtitle}>What about internet lag ?</h3>
                <p className={style.text}>
                  Since Stellar-Rocket is a real-time, networked game (a game that your client talks to over the internet),
                  there is a delay between the time that you click the cashout button and the time that the server receives your cashout event.
                  The farther you are from the server and the worse your internet connection is, then the longer it takes for your events to reach the Stellar-Rocket game server.
                  Under perfect circumstances, your message can travel to the server at the speed of light, but it still takes light 134 milliseconds to travel around the world.
                  The best tool against network lag is to use the auto cashout feature. Since your auto cashout is sent to the server before the game starts, the server can cash you out regardless of lag.
                  For example, if you are on a bad connection and you want to cash out at 2x, then we recommend setting your auto cashout to 2x instead of relying on your client to send the manual cashout button-press in time.
                  We know that lag / connection issues can be painful to deal with, but we want to stress the fact that Stellar-Rocket does not make any additional money from it.
                  What lag means for Stellar-Rocket is that, 99% of the time, players are cashing out slightly later than intended which means that they are profiting more.
                  However, rarely, the game does crash after you click cashout but before your client's message reaches the server.
                  Unfortunately, we cannot do anything about that. We wish we could. Every multiplayer game developer would love if all players had 0 ping. But that is physically impossible.
                  It is also unfeasible for us to refund money in these rare cases since we make no additional money from it.
                  All we can recommend is for you to rely on the auto cashout feature if you want to guarantee that network lag does not affect your experience.
                </p>
              </div>
            </div>
            <div className={style.answer}>
              <h3 className={style.subtitle}>Do you take commission ?</h3>
              <p className={style.text}>
                Yes, 0.15% of winning bets.
              </p>
            </div>
          </div>
          <div className={style.section} id='proof'>
            <h2 className={style.title}>Fair Proof</h2>
            <div className={style.content}>
              <p>
                <iframe
                  width='100%'
                  height='500'
                  src='//jsfiddle.net/v739ozdk/2/embedded/result/dark/'
                  allowpaymentrequest
                  allowfullscreen='allowfullscreen'
                  frameborder='0' />
              </p>
            </div>
          </div>
          <div className={style.section} id='contact'>
            <h2 className={style.title}>Contact</h2>
            <div className={style.content}>
              <p>
                contact(at)stellar-rocket.com
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
