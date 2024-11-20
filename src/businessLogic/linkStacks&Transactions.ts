import { selectTruthyItems } from "../shared/selectors"
import { Stack, Stacks, StacksArray } from "../shared/types/stacks"
import { Transaction, Transactions } from "../shared/types/transactions"

export interface LinkedData {
  stackedTransactions: Transactions,
  nonStackedTransactions: Transactions
  stacks: Stacks,
  deposits: Transactions
}

const getMatchingStackNames = (transaction: Transaction, stacks: Stacks) => {
  const stacksArray: StacksArray = Object.values(stacks)
  const transStacks = stacksArray.map((stack) => {
    const keywordMatch = stack.components.keywords.filter((keyword) => transaction.title.includes(keyword))
    if(keywordMatch.length) {
      return stack.name
    }
    return null
  })
  return transStacks.filter(selectTruthyItems).flat() as string[]
}

const handleTheNonStacked = (linkedData: LinkedData, nonStackedTransaction: Transaction) => {
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

const updateTransaction = (firstStack: Stack, transaction: Transaction, stackNames: string[]): Transaction => {
  const keyword = firstStack.components.keywords.find((keyword) => transaction.title.includes(keyword))
  return { ...transaction, keyword, stacks: stackNames }
}

const updateStack = (newTransaction: Transaction, curStack: Stack) => {
  const { components: curComponents } = curStack
  const { components: { transactions: curTransactions } } = curStack
  return {
    ...curStack,
    coins: curStack.coins + newTransaction.coins,
    components: {
      ...curComponents,
      transactions: [ ...curTransactions, newTransaction ]
    }
  }
}

const updateCollection = (collection: LinkedData, newTransaction: Transaction, newStack: Stack): LinkedData => {
  const { stackedTransactions: curStackedTransactions, stacks: curStacks } = collection
    return {
      ...collection,
      stackedTransactions: [
        ...curStackedTransactions,
        newTransaction
      ],
      stacks: {
        ...curStacks,
        [newStack.name]: newStack
      }
    }
}

const linkData = (stacks: Stacks, transactions: Transactions) => {
  const defaultResult: LinkedData = { stackedTransactions: [], nonStackedTransactions: [], stacks, deposits: [] }

  return transactions.reduce((collection, transaction) => {
    const stackNames = getMatchingStackNames(transaction, stacks)
    if(!stackNames.length) {
      return handleTheNonStacked(collection, transaction)
    }

    const firstStackName = stackNames[0]
    const firstStack = stacks[firstStackName]
    const updatedTransaction = updateTransaction(firstStack, transaction, stackNames)
    const updatedStack = updateStack(updatedTransaction, firstStack)
    return updateCollection(collection, updatedTransaction, updatedStack)
  }, defaultResult)
}

export default linkData
