import React from 'react'
import { List } from 'material-ui/List'

import TransactionAPI from '../../lib/api/transaction'
import TransactionListElement from './elements/transaction'

import style from './transaction.css'

export default class TransactionList extends React.Component {
  constructor (props) {
    super(props)

    this.transactionAPI = new TransactionAPI()
    this.state = {
      transactions: []
    }

    this.getTransactions()
  }

  getTransactions () {
    this.transactionAPI.get().then((transactions) => {
      this.setState({
        transactions
      })
    })
  }

  getTransactionItem (transaction) {
    return (
      <TransactionListElement
        key={transaction._id}
        transaction={transaction} />
    )
  }

  render () {
    console.log(this.state)
    let transactionList = this.state.transactions.map(this.getTransactionItem.bind(this))

    return (
      <List
        className={style.list}>
        {transactionList}
      </List>
    )
  }
}
