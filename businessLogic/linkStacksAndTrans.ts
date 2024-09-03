import { selectTruthyItems } from "../shared/selectors"
import { Stack, Stacks, StacksArray } from "../shared/types/stacks"
import { Transaction, Transactions } from "../shared/types/transactions"

export interface ConnectedStacksAndTrans {
  transactions: Transactions,
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

const updateStacksWithTrans = (transaction: Transaction, _stacks: Stacks, stackNames: string[]) => {
  let stacks: Stacks = { ..._stacks }
  stackNames.forEach(stackName => {
    const stack = stacks[stackName]
    if(stack) {
      stack.transactions.push(transaction)
      stack.coins += transaction.transaction
    }
  })
  return stacks
}

const collectTheNonStacked = (linkedData: ConnectedStacksAndTrans) => {

  let coins = 0
  let freeTransactions: Transactions = []
  linkedData.transactions.forEach(transaction => {
    if(!transaction.stacks.length) {
      coins += transaction.transaction
      freeTransactions.push(transaction)
    }
  })

  const theNonStacked: Stack = {
    coins,
    transactions: freeTransactions,
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
    theNonStacked,
    freeTransactions
  }
}

const linkData = (stacks: Stacks, transactions: Transactions) => {
  const stacksArray: StacksArray = Object.values(stacks)
  const defaultResult: ConnectedStacksAndTrans = { transactions: [], stacks }

  return transactions.reduce((previousValue, transaction) => {
    const stackNames = findStacksForTrans(transaction, stacksArray)
    const updatedTransaction = { ...transaction, stacks: stackNames }
    const updatedStacks = updateStacksWithTrans(updatedTransaction, stacks, stackNames)
    return {
      transactions: [
        ...previousValue.transactions,
        updatedTransaction
      ],
      stacks: updatedStacks
    }
  }, defaultResult)
}

const linkStacksAndTrans = (stacks: Stacks, transactions: Transactions) => {
  const linkedData = linkData(stacks, transactions)
  const { theNonStacked, freeTransactions } = collectTheNonSt2acked(linkedData)
  return {
    ...linkedData,
    stacks: {
      ...linkedData.stacks,
      ['Non_Stacked']: theNonStacked
    } as Stacks,
    freeTransactions
  }
}

export default linkStacksAndTrans
