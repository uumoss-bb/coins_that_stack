import { Stack, Stacks, StacksArray } from "../shared/types/stacks";

const orderStacksByImportance = (stacks: Stacks): StacksArray => {
  const stacksArray: StacksArray = Object.values(stacks)
  const nonImportantStacks: StacksArray = []
  const defaultOrderedStacks = {} as { [key: number]: Stack; }
  const orderedStacks = stacksArray.reduce((prevValue, stack) => {
    const importanceLevel = stack.depositCadence?.importanceLevel
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
    nonImportantStacks.push(stack)
    return prevValue
  }, defaultOrderedStacks)

  return [...Object.values(orderedStacks), ...nonImportantStacks]
}

export default  orderStacksByImportance
