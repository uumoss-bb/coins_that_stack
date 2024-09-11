import { WEEK_MS } from "../shared/enums/time";
import { StacksArray } from "../shared/types/stacks";
import { DepositIncidences, DepositTypes } from "../shared/types/income";

const getIncidenceDate:{ [key in DepositIncidences]: ()=>number } = {
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
    if(stack.depositCadence) {
      const { type, amount, incidence, lastUpdated } = stack.depositCadence
      const incidenceDate = getIncidenceDate[incidence]()
      const needsUpdated = lastUpdated <= incidenceDate
      if(needsUpdated) {
        const payment = getPaymentByType[type](amount, coins)
        return {
          ...stack,
          coins: stack.coins + payment,
          depositCadence: {
            ...stack.depositCadence,
            lastUpdated: Date.now()
          }
        }
      }
    }
    return stack
  })

export default addCoinsToStacks
