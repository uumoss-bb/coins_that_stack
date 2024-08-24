import _Income from '../../middleware/Income'
import _Stacks from '../../middleware/Stacks'
import defaultStacks from '../../shared/defaultStacks'
import { convertDate } from '../../shared/normalizers'

const defaultIncomeFile = {
  coins: 3750
}

const newLastUpdated = 'Aug 15, 2024'
const newLastUpdatedMilliSec = convertDate(newLastUpdated, 'milliseconds')

it("Set Up System", () => {
  const { income, coins, updateIncome } = new _Income()
  const { stacks, lastUpdated, updateLastUpdated, updateStacks } = new _Stacks()

  if(coins !== defaultIncomeFile.coins) {
    console.log("UPDATED INCOME")
    updateIncome(defaultIncomeFile)
  }

  const stacksEmpty = !Object.keys(stacks).length
  if(stacksEmpty) {
    console.log("UPDATED STACKS")
    updateStacks(defaultStacks)
  }

  if(lastUpdated !== newLastUpdatedMilliSec) {
    console.log("UPDATED LAST UPDATED")
    updateLastUpdated(lastUpdated)
  }

  console.log("INCOME", income)
  console.log("STACKS", Object.keys(stacks))
})
