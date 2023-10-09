const calculateMoney = (transactions) => 
  transactions.reduce((res, transaction) => {
    if(transaction.type === "IN" && transaction.transaction) {
      res.IN.total += transaction.transaction
      res.IN.transactions.push(transaction)
    } else if(transaction.type === "OUT" && transaction.transaction) {
      res.OUT.total += (transaction.transaction * -1)
      res.OUT.transactions.push(transaction)
    }

    return res
  }, {IN: {transactions: [], total: 0}, OUT: {transactions: [], total: 0}})

export default calculateMoney
