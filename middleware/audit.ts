import _Stacks, { StackClass } from "../middleware/Stacks";
import { IncomeClass } from "./Income";
import { Stacks } from "../shared/types/stacks";

const compareStacks = (currentStacks: Stacks, latestStacks: Stacks) => {
 const stackKeys = Object.keys(currentStacks)
 return stackKeys.map(key => {
  const currentStack = currentStacks[key]
  const latestStack = latestStacks[key]
  const newCoins = currentStack.coins - latestStack.coins
  return {
    name: key,
    coins: `${currentStack.coins} - ${latestStack.coins} = ${newCoins}`,
    count: currentStack.transactions.length
  }
 })
}

function audit(CurrentStacks: StackClass, Income: IncomeClass) {
  const { coins } = Income
  const { stacks: currentStacks } = CurrentStacks
  const { latestStacks, transactions: latestTransactions, nonStackedTransactions: latestFreeTransactions } = CurrentStacks.calculateLatestExpenses()
  const fatStacks = CurrentStacks.calculatePayDay(coins)
  return {
    latestStacks,
    latestTransactions,
    latestFreeTransactions,
    latestStackChanges: compareStacks(currentStacks, latestStacks),
    fatStacks
  }
}

export default audit
