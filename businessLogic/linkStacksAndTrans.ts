import { selectTruthyItems } from "../shared/selectors"
import { Stacks, StacksArray } from "../shared/types/stacks"
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

const updateStacksWithTrans = (transaction: Transaction, _stacks: Stacks, transactionStacks: string[]) => {
  let stacks: Stacks = { ..._stacks }
  transactionStacks.forEach(stackName => {
    const stack = stacks[stackName]
    if(stack) {
      stack.transactions.push(transaction)
      stack.coins += transaction.transaction
    }
  })
  return stacks
}

const linkStacksAndTrans = (stacks: Stacks, transactions: Transactions) => {
  const stacksArray: StacksArray = Object.values(stacks)
  const defaultResult: ConnectedStacksAndTrans = { transactions: [], stacks }

  return transactions.reduce((previousValue, transaction) => {
    const transactionStacks = findStacksForTrans(transaction, stacksArray)
    const updatedTransaction = { ...transaction, stacks: transactionStacks }
    const updatedStacks = updateStacksWithTrans(updatedTransaction, stacks, transactionStacks)
    return {
      transactions: [
        ...previousValue.transactions,
        updatedTransaction
      ],
      stacks: updatedStacks
    }
  }, defaultResult)
}

export default linkStacksAndTrans
