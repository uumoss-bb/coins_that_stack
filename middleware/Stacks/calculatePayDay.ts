import addCoinsToStacks from "../../businessLogic/addCoinsToStacks"
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance"
import { StacksArray } from "../../shared/types/stacks"
import getStacks from "./getStacks"

function calculatePayDay(coins: number): StacksArray {
  const { stacks } = getStacks()
  const orderedStacks = orderStacksByImportance(stacks)
  console.log(orderedStacks)
  const fatStacks = addCoinsToStacks(coins, orderedStacks)
  return fatStacks
}

export default calculatePayDay
