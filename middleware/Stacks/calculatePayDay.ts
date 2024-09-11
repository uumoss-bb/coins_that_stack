import addCoinsToStacks from "../../businessLogic/addCoinsToStacks"
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance"
import { StacksArray } from "../../shared/types/stacks"
import getStacks from "./getStacks"

function calculatePayDay(income: number): StacksArray {
  const { stacks } = getStacks()
  const orderedStacks = orderStacksByImportance(stacks)
  const fatStacks = addCoinsToStacks(income, orderedStacks)
  return fatStacks
}

export default calculatePayDay
