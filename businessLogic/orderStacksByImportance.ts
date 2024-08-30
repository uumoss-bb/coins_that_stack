import { Stack, StacksArray } from "../shared/types/stacks";

const orderStacksByImportance = (stacks: StacksArray) => {
  const defaultOrderedStacks = {} as { [key: number]: Stack; }
  const orderedStacks = stacks.reduce((prevValue, stack) => {
    const importanceLevel = stack.deposit.importanceLevel
    if(importanceLevel) {
      if(!prevValue[importanceLevel]) {
        return {
          ...prevValue,
          [importanceLevel] : stack
        }
      } else {
        throw new Error("Stack Importance Level is incorrect")
      }
    }
    return prevValue
  }, defaultOrderedStacks)

  return Object.values(orderedStacks)
}

export default  orderStacksByImportance
