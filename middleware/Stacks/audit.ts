import _Stacks, { StackClass } from "../middleware/Stacks";
import { IncomeClass } from "./Income";
import { Stacks, StacksArray } from "../shared/types/stacks";
import orderStacksByImportance from "../businessLogic/orderStacksByImportance";

const compareStacks = (currentStacks: StacksArray, latestStacks: Stacks) => {
 return currentStacks.map(currentStack => {
  const latestStack = latestStacks[currentStack.name]
  const latestCoin = Math.abs(latestStack.coins)
  const newCoins = currentStack.coins - latestCoin
  return {
    name: currentStack.name,
    count: latestStack.transactions.length,
    original_coins: currentStack.coins,
    expenses: latestStack.coins,
    new_coins: newCoins
  }
 })
}

function audit(CurrentStacks: StackClass, Income: IncomeClass) {
  const { coins } = Income
  const { stacks: currentStacks } = CurrentStacks
  const {
    latestStacks,
    stackedTransactions: latestStackedTransactions,
    nonStackedTransactions: latestFreeTransactions,
    deposits
  } = CurrentStacks.calculateLatestExpenses()
  const fatStacks = CurrentStacks.calculatePayDay(coins)
  return {
    latestStacks,
    latestStackedTransactions,
    latestFreeTransactions,
    latestStackChanges: compareStacks(orderStacksByImportance(currentStacks), latestStacks),
    deposits,
    fatStacks
  }
}

export default audit
