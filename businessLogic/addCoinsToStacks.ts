import { WEEK_MS } from "../shared/enums/time";
import { StackPayments, StacksArray } from "../shared/types/stacks";
import { DepositIncidences, DepositTypes } from "../shared/types/income";

const getIncidenceDate:{ [key in DepositIncidences]: ()=>number } = {
  'bi-weekly': () => Date.now() - (WEEK_MS * 2),
  'weekly': () => Date.now() - WEEK_MS,
}

const getPaymentByType:{ [key in DepositTypes]: (amount: number, coins: number)=>number } = {
  'percent': (amount, percent) => (amount / 100) * percent,
  'exact': (amount) => amount,
}

const addCoinsToStacks = (income: number, orderedStacks: StacksArray) => {
  // This needs to be updated to handle when we go over the income amount
  const stackPayments: StackPayments = {}
  const fatStacks = orderedStacks.map(stack => {
    if(stack.depositCadence && stack.depositCadence.importanceLevel) {
      const { type, amount, incidence, lastUpdated } = stack.depositCadence
      const incidenceDate = getIncidenceDate[incidence]()
      const needsUpdated = lastUpdated <= incidenceDate
      const hardUpdate = process.env.HARD_UPDATE === 'true'
      if(needsUpdated || hardUpdate) {
        const payment = getPaymentByType[type](amount, income)
        stackPayments[stack.name] = payment
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

  return { fatStacks, stackPayments }
}

export default addCoinsToStacks
