import { WEEK_MS } from "../shared/enums/time";
import { convertDate } from "../shared/normalizers";
import { DepositTypes, StackIncidences, Stacks, StacksArray } from "../shared/types/stacks";

const getIncidenceDate:{ [key in StackIncidences]: ()=>number } = {
  'bi-weekly': () => Date.now() - (WEEK_MS * 2),
  'weekly': () => Date.now() - WEEK_MS,
}

const getPaymentByType:{ [key in DepositTypes]: (amount: number, coins: number)=>number } = {
  'percent': (amount, coins) => (amount / 100) * coins,
  'exact': (amount) => amount,
}

// const stacksArray = Object.values(stacks)
// const orderedStacks = orderStacksByImportance(stacksArray)
const addCoinsToStacks = (coins: number, orderedStacks: StacksArray) =>
  orderedStacks.map(stack => {
    const { type, amount, incidence, lastUpdated } = stack.deposit
    const incidenceDate = getIncidenceDate[incidence]()
    const needsUpdated = lastUpdated <= incidenceDate
    if(needsUpdated) {
      const payment = getPaymentByType[type](amount, coins)
      return {
        ...stack,
        coins: stack.coins + payment,
        lastUpdated: Date.now()
      }
    }
    return stack
  })

export default addCoinsToStacks
