import { Transactions } from "../shared/types/transactions"


const sortByStack = (transactions: Transactions) => {
  const defaultTransObj: { [key in string]: Transactions } = {}
  const transObj = transactions.reduce((prevValue, transaction) => {
    const firstStack = transaction.stacks[0]
    const prevStackTransactions = prevValue[firstStack] || []
    return {
      ...prevValue,
      [firstStack]: [ ...prevStackTransactions, transaction]
    }
  }, defaultTransObj)

  return Object.values(transObj).flat()
}

const sortByDate = (transactions: Transactions) =>
  transactions.sort((a, b) => { return a.date - b.date })

const sortTransactions = (transactions: Transactions, type: 'date'|'stack',) => {
  if(type === 'stack') {
    return sortByStack(transactions)
  }
  return sortByDate(transactions)
}


export default sortTransactions
