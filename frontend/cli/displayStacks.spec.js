import _Stacks from '../../middleware/Stacks'

it("GET GROUPS", () => {
  const { summarizeExpenses } = new _Stacks()
  const { summarizedStacks, stackedTransactions, nonStackedTransactions } = summarizeExpenses()
  console.table(summarizedStacks)
  console.table(stackedTransactions)
  console.table(nonStackedTransactions)
})
