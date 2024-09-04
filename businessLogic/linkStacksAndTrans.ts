import { deepCopy } from "../shared/object"
import { selectTruthyItems } from "../shared/selectors"
import { Stack, Stacks, StacksArray } from "../shared/types/stacks"
import { Transaction, Transactions } from "../shared/types/transactions"

export interface ConnectedStacksAndTrans {
  stackedTransactions: Transactions,
  nonStackedTransactions: Transactions
  stacks: Stacks
}

const findStacksForTrans = (transaction: Transaction, stacks: StacksArray) => {
  const transStacks = stacks.map((stack) => {
    const keywordMatch = stack.keywords.filter((keyword) => transaction.title.includes(keyword))
    if(keywordMatch.length) {
      return stack.name
    }
    return null
  })
  return transStacks.filter(selectTruthyItems).flat() as string[]
}

const updateStacksWithTrans = (transaction: Transaction, _stacks: Stacks, stackNames: string[]) =>
  stackNames.reduce((stacks, stackName) => {
    const stack = stacks[stackName]
    stack.transactions.push(transaction)
    stack.coins += transaction.transaction
    return {
      [stackName]: stack,
      ...stacks,
    }
  }, deepCopy(_stacks))

const handleTheNonStacked = (linkedData: ConnectedStacksAndTrans, nonStackedTransaction: Transaction) => {

  const nonStackedName = 'Non_Stacked'
  const nonStackedCoins = linkedData.stacks[nonStackedName]?.coins || 0
  const nonStackedTransactions: Transactions = linkedData.stacks[nonStackedName]?.transactions || []
  const theNonStacked: Stack = {
    coins: nonStackedCoins + nonStackedTransaction.transaction,
    transactions: [ ...nonStackedTransactions, nonStackedTransaction ],
    name: "Non-Stacked",
    keywords: [ "non" ] ,
    deposit: {
      type: "exact",
      incidence: 'bi-weekly',
      amount: 0,
      importanceLevel: null,
      lastUpdated: 0
    }
  }

  return {
    ...linkedData,
    stacks: {
      ...linkedData.stacks,
      [nonStackedName]: theNonStacked
    },
    nonStackedTransactions: [
      ...linkedData.nonStackedTransactions,
      nonStackedTransaction
    ]
  }
}

const linkStacksAndTrans = (stacks: Stacks, transactions: Transactions) => {
  const stacksArray: StacksArray = Object.values(stacks)
  const defaultResult: ConnectedStacksAndTrans = { stackedTransactions: [], nonStackedTransactions: [], stacks }

  return transactions.reduce((previousValue, transaction) => {
    const stackNames = findStacksForTrans(transaction, stacksArray)
    const updatedTransaction = { ...transaction, stacks: stackNames }
    if(!stackNames.length) {
      return handleTheNonStacked(previousValue, updatedTransaction)
    }
    const updatedStacks = updateStacksWithTrans(updatedTransaction, previousValue.stacks, stackNames)
    return {
      ...previousValue,
      stackedTransactions: [
        ...previousValue.stackedTransactions,
        updatedTransaction
      ],
      stacks: updatedStacks
    }
  }, defaultResult)
}

export default linkStacksAndTrans
