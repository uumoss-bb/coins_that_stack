import { StackPayments, Stacks, StacksArray } from "../../shared/types/stacks";
import { getIncomeFile } from "../Income";
import getStacks from "./getStacks";
import calculateLatestExpenses from "./calculateExpenses";
import calculatePayDay from "./calculatePayDay";
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance";
import { formatToCurrency } from "../../shared/normalizers";

const makeNegative = (expenses:number) => expenses > 0 ? expenses * -1 : expenses

const compareStacks = (currentStacks: Stacks, latestStacks: StacksArray) => {
 return latestStacks.map(latestStack => {
  const currentStack = currentStacks[latestStack.name]
  const latestCoin = latestStack.coins
  if(!currentStack) {// handle Non-Stacked
    return {
      name: latestStack.name,
      count: latestStack.components.transactions.length,
      original_coins: formatToCurrency(0),
      expenses: formatToCurrency(makeNegative(latestCoin)),
      new_coins: formatToCurrency(latestCoin)
    }
  }

  const currentCoin = currentStack.coins
  const expenses = latestCoin > 0 ? currentCoin - latestCoin : currentCoin + Math.abs(latestCoin)
  return {
    name: currentStack.name,
    count: latestStack.components.transactions.length,
    original_coins: formatToCurrency(currentCoin),
    expenses: formatToCurrency(makeNegative(expenses)),
    new_coins: formatToCurrency(latestCoin)
  }
 })
}

const compareFatStacks = (currentStacks: Stacks, fatStacks: StacksArray, stackPayments: StackPayments) => {
  return fatStacks.map(fatStack => {
   const payment = stackPayments[fatStack.name] ? formatToCurrency(stackPayments[fatStack.name]) : null
   const currentStack = currentStacks[fatStack.name] || fatStack // handle Non-Stacked
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
  } = calculateLatestExpenses()// these are just expenses

  const { fatStacks, stackPayments } = calculatePayDay(coins, latestStacks)// these are the stacks being changed

  return {
    latestStacks,
    latestStackedTransactions,
    latestFreeTransactions,
    latestStackChanges: compareStacks(currentStacks, orderStacksByImportance(latestStacks)),
    deposits,
    fatStacks: compareFatStacks(latestStacks, fatStacks, stackPayments),
    stackPayments
  }
}

export default audit
