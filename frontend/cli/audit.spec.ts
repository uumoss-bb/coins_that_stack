import audit from '../../middleware/audit'
import _Stacks from '../../middleware/Stacks'
import _Income from '../../middleware/Income'
it("AUDIT", () => {
  const Income = new _Income()
  const CurrentStacks = new _Stacks()
  const { LatestStacks } = audit(CurrentStacks, Income)
  const { summarizedStacks: latestSummarizedStacks, stackedTransactions, nonStackedTransactions } = LatestStacks.summarizeExpenses()

  console.table(latestSummarizedStacks)
  console.table(stackedTransactions)
  console.table(nonStackedTransactions)
})
