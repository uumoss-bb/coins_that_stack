import _Stacks from '../../middleware/Stacks'

it("GET GROUPS", () => {
  const Stacks = new _Stacks()
  const {
    stacksForTable,
    stackedTransactionsForTable,
    nonStackedTransactionsForTable
  } = Stacks.summarizeExpenses()
  console.table(stacksForTable)
  console.table(stackedTransactionsForTable)
  console.table(nonStackedTransactionsForTable)
})
