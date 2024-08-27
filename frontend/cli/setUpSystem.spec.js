import _Income from '../../middleware/Income'
import _Stacks from '../../middleware/Stacks'
import defaultStacks from '../../shared/defaultStacks'
import { convertDate } from '../../shared/normalizers'

const defaultIncomeFile = {
  coins: 3750,
  incidence: 'bi-weekly'
}

const newLastUpdated = 'Aug 1, 2024'
const newLastUpdatedMilliSec = convertDate.milliseconds(newLastUpdated)

it("Set Up System", () => {
  const Income = new _Income(); const { income, coins } = Income;
  const Stacks = new _Stacks(); const { stacks, lastUpdated } = Stacks

  if(coins !== defaultIncomeFile.coins) {
    console.warn("UPDATED INCOME")
    updateIncome(defaultIncomeFile)
  }

  const stacksEmpty = !Object.keys(stacks).length
  if(stacksEmpty) {
    console.warn("UPDATED STACKS")
    Stacks.updateStacks(defaultStacks)
  }

  if(lastUpdated !== newLastUpdatedMilliSec) {
    console.warn("UPDATED LAST UPDATED")
    Stacks.updateLastUpdated(newLastUpdatedMilliSec)
  }

  console.log("INCOME", income)
  console.log("STACKS", Object.keys(stacks))

})
