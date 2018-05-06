import React from 'react'
import Subheader from 'material-ui/Subheader'
import BankAPI from '../../../lib/api/bank'

import style from './deposit.css'

export default class DepositForm extends React.Component {
  constructor (props) {
    super(props)
    this.bankAPI = new BankAPI()

    this.state = {
      stellarRocketAddress: ''
    }
  }

  componentDidMount () {
    this.bankAPI.getStellarRocketAddress().then((address) => {
      this.setState({
        stellarRocketAddress: address
      })
    })
  }

  render () {
    return (<div>
      <Subheader className={style.subTitle}>Deposit</Subheader>
      <p className={style.depositInstruction}>
        Send Lumens to the following address. <strong>Do not forget</strong> the MemoText. If not present, your account will not be credited.
      </p>
      <div className={style.depositInfos}>
        <label>Address: </label>
        <span className={style.stellarRocketAddress}>
          <strong>{this.state.stellarRocketAddress}</strong>
        </span>
      </div>
      <div className={style.depositInfos}>
        <label>MemoText: </label>
        <span>
          <strong>{this.props.wallet._id}</strong>
        </span>
      </div>
    </div>)
  }
}
