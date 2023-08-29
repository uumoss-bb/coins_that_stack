const calculateMoney = (transactions) => 
  transactions.reduce((res, transaction) => {
    if(transaction.type === "IN") {
      res.IN.total += transaction.transaction
      res.IN.transactions.push(transaction)
    } else {
      res.OUT.total += transaction.transaction
      res.OUT.transactions.push(transaction)
    }

    return res
  }, {IN: {transactions: [], total: 0}, OUT: {transactions: [], total: 0}})

export default calculateMoney
