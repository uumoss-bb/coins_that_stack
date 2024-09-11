import addCoinsToStacks from "../../businessLogic/addCoinsToStacks"
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance"
import { StackPayments, StacksArray } from "../../shared/types/stacks"
import getStacks from "./getStacks"

type PayDayResult = { fatStacks: StacksArray, stackPayments: StackPayments }

function calculatePayDay(income: number): PayDayResult {
  const { stacks } = getStacks()
  const orderedStacks = orderStacksByImportance(stacks)
  return addCoinsToStacks(income, orderedStacks)
}

export default calculatePayDay
