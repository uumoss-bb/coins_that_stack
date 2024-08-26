import { StackClass } from '.';
import { Stacks } from '../../shared/types/stacks';

type SummarizedStack = {
  name: string,
  keywords: string[]
  numOfTransactions: number,
  coins: number
}

const summarizeStacks = (stacks: Stacks): SummarizedStack[] => {
  const stacksArray = Object.values(stacks)
  return stacksArray.map( ({name, keywords, transactions, coins}): SummarizedStack =>
    ({ name, keywords, coins, numOfTransactions: transactions.length })
  )
}

const summarizeStackExpenses = function(this: StackClass) {
  const { stacks, transactions, freeTransactions } = this
  return {
    summarizedStacks: summarizeStacks(stacks),
    stackedTransactions: transactions.filter(transaction => transaction.stacks.length),
    nonStackedTransactions: freeTransactions
  }
}

export default summarizeStackExpenses
