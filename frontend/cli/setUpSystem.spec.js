import defaultStacks from '../../shared/defaultStacks'
import _Income from '../../middleware/Income'
import _Stacks from '../../middleware/Stacks'

import { INCOME_FILE_NAME, STACK_FILE_NAME } from '../../shared/enums/fileNames'

const defaultIncomeFile = {
  coins: 3750
}

it("Set Up System", () => {
  const Income = new _Income()
  const Stacks = new _Stacks()
  Income.updateIncome(defaultIncomeFile)
  Stacks.updateStacks(defaultStacks)

  const income = Income.getCoins()
  console.log("INCOME", income)

  const stacks = Stacks.getStacks()
  console.log("STACKS", stacks)
})
