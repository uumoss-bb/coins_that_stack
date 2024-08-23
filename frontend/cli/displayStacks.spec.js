import summarizeStackExpenses from '../../middleware/summarizeStackExpenses_cli'

it("GET GROUPS", () => {
  const {
    stacksForTable,
    stackedTransactionsForTable,
    nonStackedTransactionsForTable
  } = summarizeStackExpenses()
  console.table(stacksForTable)
  console.table(stackedTransactionsForTable)
  console.table(nonStackedTransactionsForTable)
})
