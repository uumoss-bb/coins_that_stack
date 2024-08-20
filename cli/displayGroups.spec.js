import getGroups from '../middleWare/toFrontEnd/getGroups_cli'

it("GET GROUPS", () => {
  const {
    groupsForTable,
    groupedTransactionsForTable,
    nonGroupedTransactionsForTable
  } = getGroups()
  console.table(groupsForTable)
  console.table(groupedTransactionsForTable)
  console.table(nonGroupedTransactionsForTable)
})
