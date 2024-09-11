import { Stacks, StacksArray } from "../../shared/types/stacks";
import { getIncomeFile } from "../Income";
import getStacks from "./getStacks";
import calculateLatestExpenses from "./calculateExpenses";
import calculatePayDay from "./calculatePayDay";
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance";

const compareStacks = (currentStacks: StacksArray, latestStacks: Stacks) => {
 return currentStacks.map(currentStack => {
  const latestStack = latestStacks[currentStack.name]
  const latestCoin = Math.abs(latestStack.coins)
  const newCoins = currentStack.coins - latestCoin
  return {
    name: currentStack.name,
    count: latestStack.components.transactions.length,
    original_coins: currentStack.coins,
    expenses: latestStack.coins,
    new_coins: newCoins
  }
 })
}

function audit() {
  const { coins } = getIncomeFile()
  const { stacks: currentStacks } = getStacks()
  const {
    latestStacks,
    stackedTransactions: latestStackedTransactions,
    nonStackedTransactions: latestFreeTransactions,
    deposits
  } = calculateLatestExpenses()

  const fatStacks = calculatePayDay(coins)

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
