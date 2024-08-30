import { Stacks } from "../shared/types/stacks";
import orderStacksByImportance from "./orderStacksByImportance";

const addCoinsToStacks = (coins: number, stacks: Stacks) => {
  const stacksArray = Object.values(stacks)
  const orderedStacks = orderStacksByImportance(stacksArray)
  const fatStacks = orderedStacks.map(stack => {
    const { type, amount, incidence, lastUpdated } = stack.deposit
  })
}
