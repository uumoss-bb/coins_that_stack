import addCoinsToStacks from "../../businessLogic/addCoinsToStacks"
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance"
import { StackPayments, Stacks, StacksArray } from "../../shared/types/stacks"
import getStacks from "./getStacks"

type PayDayResult = { fatStacks: StacksArray, stackPayments: StackPayments }

function calculatePayDay(income: number, _stacks?: Stacks): PayDayResult {
  const stacks = _stacks || getStacks().stacks
  const orderedStacks = orderStacksByImportance(stacks)
  return addCoinsToStacks(income, orderedStacks)
}

export default calculatePayDay
