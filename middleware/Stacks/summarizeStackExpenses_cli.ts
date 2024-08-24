import linkStacksAndTrans, { ConnectedStacksAndTrans } from '../../businessLogic/linkStacksAndTrans'
import normalizeTransactions from "../../businessLogic/normalizeTransactions"
import coin from '../../transactions'
import defaultStacks from '../../shared/defaultStacks'
import { selectTruthyItems } from '../../shared/selectors';
import { Transaction, Transactions } from '../../shared/types/transactions';
import { StackClass } from '.';

type StackItem = {
  coins: number,
  transactions: Transactions,
  name: string,
  keywords: string[]
}

const StackItem = (stack: StackItem) =>  ({
  keywords: stack.keywords.join('||'),
  count: stack.transactions.length,
  coins: stack.coins
})

const TransactionWithStackItem = (transaction: Transaction) => ({
  title: transaction.title,
  stacks: transaction.stacks,
  date: transaction.date,
  [transaction.type]: transaction.transaction
})

const collectNonStackedTransactionsInStack = (transactions: Transactions) => {
  let coins = 0
  let nonStackTransactions: Transactions = []
  transactions.forEach(transaction => {
    if(!transaction.stacks.length) {
      coins += transaction.transaction
      transactions.push(transaction)
    }
  })

  return { 'Non-Stacked': StackItem({ coins, transactions: nonStackTransactions, name: "Non-Stacked", keywords: [ "non" ] })}
}

const normalizeStacksForTable = (linkedData: ConnectedStacksAndTrans) => {
  const arrayOfStacks = Object.values(linkedData.stacks)

  const actualStacks = arrayOfStacks.reduce((prevValue, stack) => {
    return {
      ...prevValue,
      [stack.name]: StackItem(stack)
    }
  },{})

  const nonStackedTransactions = collectNonStackedTransactionsInStack(linkedData.transactions)

  return {
    ...actualStacks,
    ...nonStackedTransactions
  }
}

const normalizeStackedTransactionsForTable = (linkedData: ConnectedStacksAndTrans) => {
  const arrayOfStacks = Object.values(linkedData.stacks)
  const transactionsForTable: Object[] = []

  arrayOfStacks.forEach((stack) => {
    transactionsForTable.push(stack.transactions.map((transaction) => TransactionWithStackItem(transaction)))
  })

  return transactionsForTable.flat()
}

const normalizeNonStackedTransactionsForTable = ({ transactions }: ConnectedStacksAndTrans) =>
  transactions.map((transaction) => {
    if(!transaction.stacks.length) {
      return TransactionWithStackItem(transaction)
    }
    return null
  }).filter(selectTruthyItems)

const summarizeStackExpenses = function(this: StackClass) {
  const linkedData = {
    stacks: this.getStacks(),
    transactions: this.getTransactions()
  }
  return {
    stacksForTable: normalizeStacksForTable(linkedData),
    stackedTransactionsForTable: normalizeStackedTransactionsForTable(linkedData),
    nonStackedTransactionsForTable: normalizeNonStackedTransactionsForTable(linkedData)
  }
}

export default summarizeStackExpenses
