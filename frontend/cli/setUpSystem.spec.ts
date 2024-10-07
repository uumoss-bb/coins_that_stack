import { getIncomeFile, updateIncomeFile } from '../../middleware/Income'
import { defaultStacks, defaultIncome } from '../../shared/defaultData'
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { getDirtyTransactions, updateTransactionsFile } from '../../middleware/Transactions'
import { getStacks, updateStacksFile } from '../../middleware/Stacks'

const getOrSetIncome = () => {
  try {
    return getIncomeFile()
  } catch (err) {
    console.log("UPDATED INCOME")
    updateIncomeFile(defaultIncome)
    return defaultIncome
  }
}

const getOrSetStack = () => {
  try {
    return getStacks()
  } catch (err){
    console.log("UPDATED STACKS")
    updateStacksFile(defaultStacks)
    return  {
      stacks: defaultStacks,
      lastUpdated: 0
    }
  }
}

it("Set Up System", () => {
  let income = getOrSetIncome()
  let { stacks } = getOrSetStack()

  const dirtyTransactions = getDirtyTransactions()
  updateTransactionsFile(dirtyTransactions)

  const orderedStacks = orderStacksByImportance(stacks).map(({name}) => name)

  console.log("INCOME", income)
  console.log("STACKS", orderedStacks)

})
