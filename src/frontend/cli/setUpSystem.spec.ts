import { getIncomeFile, updateIncomeFile } from '../../middleware/Income'
import { defaultStacks, defaultIncome } from '../../shared/defaultData'
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { getDirtyTransactions, updateTransactionsFile } from '../../middleware/Transactions'
import { getStacks, updateStacksFile } from '../../middleware/Stacks'
import { convertDate } from '../../shared/normalizers'

const getOrSetIncome = () => {
  try {
    return getIncomeFile()
  } catch (err) {
    updateIncomeFile(defaultIncome)
    console.log("CREATED INCOME FILE")
    return defaultIncome
  }
}

const getOrSetStack = () => {
  try {
    return getStacks()
  } catch (err){
    updateStacksFile({ ...defaultStacks, lastUpdated: 0 })
    console.log("CREATED STACKS FILE")
    return  {
      stacks: defaultStacks,
      lastUpdated: 0
    }
  }
}

it("Set Up System", () => {
  let income = getOrSetIncome()
  let { stacks, lastUpdated } = getOrSetStack()

  const dirtyTransactions = getDirtyTransactions()
  updateTransactionsFile(dirtyTransactions)

  const orderedStacks = orderStacksByImportance(stacks).map(({name}) => name)

  console.log("INCOME", income)
  console.log("LASTUPDATED", convertDate.full(lastUpdated))
  console.log("STACKS", orderedStacks)

})