import _Income from '../../middleware/Income'
import _Stacks from '../../middleware/Stacks'
import defaultStacks from '../../shared/defaultStacks'

const defaultIncomeFile = {
  coins: 3750
}

it("Set Up System", () => {
  const Income = new _Income()
  const Stacks = new _Stacks()

  if(Income.getCoins() === 0) {
    Income.updateIncome(defaultIncomeFile)
  }

  const stacksEmpty = !Object.keys(Stacks.getStacks()).length
  if(stacksEmpty) {
    Stacks.updateStacks(defaultStacks)
  }

  const income = Income.getCoins()
  console.log("INCOME", income)

  const stacks = Stacks.getStacks()
  console.log("STACKS", stacks)
})
