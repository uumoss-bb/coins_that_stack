import { StackPayments, Stacks, StacksArray } from "../../shared/types/stacks";
import { getIncomeFile } from "../Income";
import getStacks from "./getStacks";
import calculateLatestExpenses from "./calculateExpenses";
import calculatePayDay from "./calculatePayDay";
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance";
import { formatToCurrency } from "../../shared/normalizers";

const compareStacks = (currentStacks: StacksArray, latestStacks: Stacks) => {
 return currentStacks.map(currentStack => {
  const latestStack = latestStacks[currentStack.name]
  const latestCoin = Math.abs(latestStack.coins)
  const newCoins = currentStack.coins - latestCoin
  return {
    name: currentStack.name,
    count: latestStack.components.transactions.length,
    original_coins: formatToCurrency(currentStack.coins),
    expenses: formatToCurrency(latestStack.coins),
    new_coins: formatToCurrency(newCoins)
  }
 })
}

const compareFatStacks = (currentStacks: Stacks, fatStacks: StacksArray, stackPayments: StackPayments) => {
  return fatStacks.map(fatStack => {
   const payment = stackPayments[fatStack.name] ? formatToCurrency(stackPayments[fatStack.name]) : null
   const currentStack = currentStacks[fatStack.name]
   return {
     name: currentStack.name,
     original_coins: formatToCurrency(currentStack.coins),
     payment,
     new_coins: formatToCurrency(fatStack.coins)
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

  const { fatStacks, stackPayments } = calculatePayDay(coins)

  return {
    latestStacks,
    latestStackedTransactions,
    latestFreeTransactions,
    latestStackChanges: compareStacks(orderStacksByImportance(currentStacks), latestStacks),
    deposits,
    fatStacks: compareFatStacks(currentStacks, fatStacks, stackPayments),
    stackPayments
  }
}

export default audit
