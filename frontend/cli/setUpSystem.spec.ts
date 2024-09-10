import { getIncome, updateIncomeFile } from '../../middleware/Income'
import defaultStacks from '../../shared/defaultStacks'
import { convertDate } from '../../shared/normalizers'
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { getDirtyTransactions, updateTransactionsFile } from '../../middleware/Transactions'
import { getStacks, updateStacksFile } from '../../middleware/Stacks'
import { Stacks } from '../../shared/types/stacks'

const defaultIncomeFile = {
  coins: 3750,
  keyword: "live nation"
}

const newLastUpdated = 'Aug 15, 2024'
const newLastUpdatedMilliSec = convertDate.milliseconds(newLastUpdated)

it("Set Up System", () => {
  const income = getIncome()
  const { stacks, lastUpdated } = getStacks()

  const dirtyTransactions = getDirtyTransactions()
  updateTransactionsFile(dirtyTransactions)

  if(income.coins !== defaultIncomeFile.coins) {
    console.warn("UPDATED INCOME")
    updateIncomeFile(defaultIncomeFile)
  }

  const stacksEmpty = !Object.keys(stacks).length
  if(stacksEmpty) {
    console.warn("UPDATED STACKS")
    updateStacksFile(defaultStacks)
  }

  if(lastUpdated !== newLastUpdatedMilliSec) {
    console.warn("UPDATED LAST UPDATED")
    updateStacksFile(newLastUpdated)
  }

  const orderedStacks = orderStacksByImportance(stacks).map(({name}) => name)

  console.log("INCOME", income)
  console.log("STACKS", orderedStacks)

})
