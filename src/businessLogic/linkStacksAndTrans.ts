import { convertDate } from "../shared/normalizers"
import { deepCopy } from "../shared/object"
import { selectTruthyItems } from "../shared/selectors"
import { Stack, Stacks, StacksArray } from "../shared/types/stacks"
import { Transaction, Transactions } from "../shared/types/transactions"

export interface ConnectedStacksAndTrans {
  stackedTransactions: Transactions,
  nonStackedTransactions: Transactions
  stacks: Stacks,
  deposits: Transactions
}

const findStacksForTrans = (transaction: Transaction, stacks: StacksArray) => {
  const transStacks = stacks.map((stack) => {
    const keywordMatch = stack.components.keywords.filter((keyword) => transaction.title.includes(keyword))
    if(keywordMatch.length) {
      return stack.name
    }
    return null
  })
  return transStacks.filter(selectTruthyItems).flat() as string[]
}

const updateStacksWithTrans = (transaction: Transaction, _stacks: Stacks, stackNames: string[]) =>
  stackNames.reduce((stacks, stackName) => {
    const stack = stacks[stackName] as Stack
    stack.components.transactions.push(transaction)
    stack.coins += transaction.coins
    return {
      [stackName]: stack,
      ...stacks,
    }
  }, deepCopy(_stacks))

const handleTheNonStacked = (linkedData: ConnectedStacksAndTrans, nonStackedTransaction: Transaction) => {
  if(nonStackedTransaction.type === 'deposit') {
    return {
      ...linkedData,
      deposits: [...linkedData.deposits, nonStackedTransaction]
    }
  }

  const nonStackedName = 'Non_Stacked'
  const nonStackedCoins = linkedData.stacks[nonStackedName]?.coins || 0
  const nonStackedTransactions: Transactions = linkedData.stacks[nonStackedName]?.components.transactions || []
  const theNonStacked: Stack = {
    coins: nonStackedCoins + nonStackedTransaction.coins,
    components: {
      transactions: [ ...nonStackedTransactions, nonStackedTransaction ],
      keywords: [ "non" ],
    },
    name: "Non-Stacked"
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

const updateTransaction = (transaction: Transaction, stacks: Stacks, stackNames: string[]) => {
  const firstStack = stacks[stackNames[0]]
  const keyword = firstStack.components.keywords.find((keyword) => transaction.title.includes(keyword))
  return { ...transaction, keyword, stacks: stackNames }
 }

const linkStacksAndTrans = (stacks: Stacks, transactions: Transactions) => {
  const stacksArray: StacksArray = Object.values(stacks)
  const defaultResult: ConnectedStacksAndTrans = { stackedTransactions: [], nonStackedTransactions: [], stacks, deposits: [] }

  return transactions.reduce((previousValue, transaction) => {
    const stackNames = findStacksForTrans(transaction, stacksArray)
    if(!stackNames.length) {
      return handleTheNonStacked(previousValue, transaction)
    }
    const updatedTransaction = updateTransaction(transaction, stacks, stackNames)
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
