import audit from '../../middleware/audit'
import _Stacks from '../../middleware/Stacks'
import _Income from '../../middleware/Income'
import { Stacks } from '../../shared/types/stacks'

const normalizeStacks = (stacks: Stacks) => {
  const stackArray = Object.values(stacks)
  return stackArray.map(stack => ({
    name: stack.name,
    coins: stack.coins,
    count: stack.transactions.length
  }))
}

it("AUDIT", () => {
  const Income = new _Income()
  const CurrentStacks = new _Stacks()
  const { latestStacks, latestStackChanges, latestFreeTransactions, latestTransactions } = audit(CurrentStacks, Income)

  console.table(normalizeStacks(latestStacks))
  console.table(latestStackChanges)
  console.table(latestTransactions)
  console.table(latestFreeTransactions)
})
