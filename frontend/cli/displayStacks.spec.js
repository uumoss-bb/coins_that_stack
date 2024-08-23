import getStacks from '../../middleware/toFrontEnd/getStacks_cli'

it("GET GROUPS", () => {
  const {
    stacksForTable,
    stackedTransactionsForTable,
    nonStackedTransactionsForTable
  } = getStacks()
  console.table(stacksForTable)
  console.table(stackedTransactionsForTable)
  console.table(nonStackedTransactionsForTable)
})
