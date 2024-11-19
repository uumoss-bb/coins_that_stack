import { StackPayments, Stacks, StacksArray } from '../../../shared/types/stacks'
import { convertDate, formatToCurrency } from '../../../shared/normalizers'
import { Transactions } from '../../../shared/types/transactions'

const makeNegative = (expenses:number) => expenses > 0 ? expenses * -1 : expenses

const normalizeStacks = (stacks: StacksArray) =>
  stacks.map(({name, coins, group}) => ({
    name,
    coins: formatToCurrency(coins),
    group: group || null
}))

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, coins, stacks, keyword = null}) => ({
    title,
    keyword,
    date: convertDate.full(date),
    coins: formatToCurrency(coins),
    stacks
}))

const normalizeDeposits = (transactions: Transactions) =>
  transactions.map(({title, date, coins}) => ({
    title,
    date: convertDate.full(date),
    coins: formatToCurrency(coins)
}))

const normalizePayDayExpenses = (income: number, stackPayments: StackPayments) => {
  const totalPayments = Object.values(stackPayments).reduce((prevValue, payment) => prevValue + payment, 0)
  return {
    totalIncome: formatToCurrency(income),
    payDayExpenses: formatToCurrency(totalPayments),
    remaining: formatToCurrency(income - totalPayments)
  }
}

const compareStacks = (currentStacks: Stacks, latestStacks: StacksArray) => {
  return latestStacks.map(latestStack => {
    const currentStack = currentStacks[latestStack.name]
    const latestCoin = latestStack.coins
    if(!currentStack) {// handle Non-Stacked
      return {
        name: latestStack.name,
        count: latestStack.components.transactions.length,
        original_coins: formatToCurrency(0),
        expenses: formatToCurrency(makeNegative(latestCoin)),
        new_coins: formatToCurrency(latestCoin)
      }
    }

    const currentCoin = currentStack.coins
    const expenses = latestCoin > 0 ? currentCoin - latestCoin : currentCoin + Math.abs(latestCoin)
    return {
      name: currentStack.name,
      count: latestStack.components.transactions.length,
      original_coins: formatToCurrency(currentCoin),
      expenses: formatToCurrency(makeNegative(expenses)),
      new_coins: formatToCurrency(latestCoin)
    }
  })
}

const compareFatStacks = (currentStacks: Stacks, fatStacks: StacksArray, stackPayments: StackPayments) => {
  return fatStacks.map(fatStack => {
    const payment = stackPayments[fatStack.name] ? formatToCurrency(stackPayments[fatStack.name]) : null
    const currentStack = currentStacks[fatStack.name] || fatStack // handle Non-Stacked
    return {
      name: currentStack.name,
      original_coins: formatToCurrency(currentStack.coins),
      payment,
      new_coins: formatToCurrency(fatStack.coins),
      group: currentStack?.group || null
    }
  })
}

const collectGroupCoins = (stacks: StacksArray) => {
  const total = {group: 'Total', coins: 0}
  const defaultObj: { [key: string]: {group: string, coins: number} } = {}
  const groupsObj = stacks.reduce((prevValue, stack) => {
    if(stack.group) {
      const existingGroupCoins = prevValue[stack.group]?.coins | 0
      const newCoins = existingGroupCoins + stack.coins
      total.coins += stack.coins
      return {
        ...prevValue,
        [stack.group]: {
          group: stack.group,
          coins: newCoins
        }
      }
    }
    return prevValue
  }, defaultObj)

  const groups = [ ...Object.values(groupsObj), total ]
  return groups.map(group => ({...group, coins: formatToCurrency(group.coins)}))
}

const prepareForUpdate = (stacks: StacksArray) =>
  stacks.reduce((collection, stack) => {
    if(stack.name !== "Non-Stacked") {
      const coins = stack.name === "BB Owes" ? 0 : stack.coins
      const freshStack = {
        ...stack,
        coins,
        components: {
          ...stack.components,
          transactions: [] as Transactions
        }
      }
      return [...collection, freshStack]
    }
    return collection
  }, [] as StacksArray)

const transformStacksToObject = (stacks: StacksArray) =>
  stacks.reduce((prevValue, stack) => ({
    ...prevValue,
    [stack.name]: stack
  }), {} as Stacks)

export {
  normalizeStacks,
  normalizeTransactions,
  normalizeDeposits,
  normalizePayDayExpenses,
  compareStacks,
  compareFatStacks,
  collectGroupCoins,
  prepareForUpdate,
  transformStacksToObject
}
