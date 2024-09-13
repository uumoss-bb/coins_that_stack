import { audit, getStacks, updateStacksFile } from '../../middleware/Stacks'
import { Transactions } from '../../shared/types/transactions'
import { convertDate, formatToCurrency } from '../../shared/normalizers'
import sortTransactions from '../../businessLogic/sortTransactions'
import { getIncomeFile } from '../../middleware/Income'
import { StackPayments, Stacks, StacksArray } from "../../shared/types/stacks";
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { selectTruthyItems } from '../../shared/selectors'

const makeNegative = (expenses:number) => expenses > 0 ? expenses * -1 : expenses

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

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, coins, stacks, keyword = null}) => ({
    title,
    keyword,
    date: convertDate.full(date),
    coins: formatToCurrency(coins),
    stacks
  }))

const normalizeStacks = (stacks: StacksArray) =>
  stacks.map(({name, coins, group}) => ({
    name,
    coins: formatToCurrency(coins),
    group: group || null
  }))

const normalizePayDayExpenses = (income: number, stackPayments: StackPayments) => {
  const totalPayments = Object.values(stackPayments).reduce((prevValue, payment) => prevValue + payment, 0)
  return {
    totalIncome: formatToCurrency(income),
    payDayExpenses: formatToCurrency(totalPayments),
    remaining: formatToCurrency(income - totalPayments)
  }
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

const transformStacksToObject = (stacks: StacksArray) =>
  stacks.reduce((prevValue, stack) => ({
    ...prevValue,
    [stack.name]: stack
  }), {} as Stacks)

const prepareForUpdate = (stacks: StacksArray) =>
  stacks.map(stack => {
    if(stack.name !== "Non-Stacked") {
      const coins = stack.name === "BB Owes" ? 0 : stack.coins
      return {
        ...stack,
        coins,
        components: {
          keywords: stack.components.keywords,
          transactions: [] as Transactions
        }
      }
    }
    return null
  })
  .filter(selectTruthyItems)


it("AUDIT", () => {
  const { coins } = getIncomeFile()
  const { stacks: currentStacks } = getStacks()
  const {
    latestStacks,
    latestFreeTransactions,
    latestStackedTransactions,
    fatStacks,
    stackPayments
  } = audit()
  const transactions = sortTransactions([...latestStackedTransactions, ...latestFreeTransactions], 'stack')

  if(process.env.AUDIT === "accept") {

    console.log("AUDIT ACCEPTED")
    const lastUpdated = convertDate.milliseconds(convertDate.full(Date.now()))
    let stacks: StacksArray|Stacks = prepareForUpdate(fatStacks) as StacksArray
    stacks = transformStacksToObject(stacks) as Stacks
    updateStacksFile({ ...stacks, lastUpdated })
  }

  if(!transactions.length) {

    console.log("COINS ARE ALL STACKED")

    console.log("COIN STACKS")
    console.table(normalizeStacks(Object.values(latestStacks)))

    console.log("GROUP COINS")
    console.table(collectGroupCoins(fatStacks))

    return
  }

  console.log("EXPENSES")
  console.table(normalizeTransactions(transactions))

  console.log("STACKS AFTER EXPENSES")
  console.table(compareStacks(currentStacks, orderStacksByImportance(latestStacks)))

  console.log("STACKS AFTER PAYDAY", normalizePayDayExpenses(coins, stackPayments))
  console.table(compareFatStacks(latestStacks, fatStacks, stackPayments))

  console.log("GROUP COINS")
  console.table(collectGroupCoins(fatStacks))
})
