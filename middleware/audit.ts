import _Stacks, { StackClass } from "../middleware/Stacks";
import { IncomeClass } from "./Income";
import { Stacks } from "../shared/types/stacks";

const WEEK_MS =  604800000

const compareStacks = (currentStacks: Stacks, latestStacks: Stacks) => {
 const stackKeys = Object.keys(currentStacks)
 return stackKeys.map(key => {
  const currentStack = currentStacks[key]
  const latestStack = latestStacks[key]
  const newCoins = currentStack.coins = latestStack.coins
  return `${currentStack.coins} - ${latestStack.coins} = ${newCoins}`
 })
}

function audit(CurrentStacks: StackClass, Income: IncomeClass) {
  const { coins } = Income
  const { stacks: currentStacks } = CurrentStacks
  const { stacks: latestStacks } = CurrentStacks.calculateLatestExpenses()
  return {
    latestStacks,
    latestStackChanges: compareStacks(currentStacks, latestStacks)
  }
}

export default audit
