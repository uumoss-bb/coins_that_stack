#!/usr/bin/env node
import { green, rainbow, yellow } from '../../shared/colors'
import { exec, echo } from 'shelljs'
import inquirer from 'inquirer'
import errorHandlerWrapper from '../../shared/errorHandlerWrapper'
import { calculateLatestExpenses, calculatePayDay, getStacks, updateStacksFile } from '../../middleware/Stacks'
import { defaultIncome, defaultStacks } from '../../shared/defaultData'
import { getIncomeFile, updateIncomeFile } from '../../middleware/Income'
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { StackPayments, Stacks, StacksArray } from '../../shared/types/stacks'
import { convertDate, formatToCurrency } from '../../shared/normalizers'
import * as prompt from '../../shared/cliPrompt'
import { getDirtyTransactions, updateTransactionsFile } from '../../middleware/Transactions'
import { Transactions } from '../../shared/types/transactions'
import sortTransactions from '../../businessLogic/sortTransactions'

const errorMessage = 'FAILED to Audit'

const makeNegative = (expenses:number) => expenses > 0 ? expenses * -1 : expenses

const addSpace = () => echo('\n')

const getOrSetIncome = () => {
  try {
    return getIncomeFile()
  } catch (err) {
    updateIncomeFile(defaultIncome)
    echo(yellow("Setup new Income File"))
    return defaultIncome
  }
}

const getOrSetStack = () => {
  try {
    return getStacks()
  } catch (err){
    updateStacksFile({ ...defaultStacks, lastUpdated: 0 })
    echo(yellow("Setup new Stacks File"))
    return  {
      stacks: defaultStacks,
      lastUpdated: 0
    }
  }
}

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

const OnDeclineUpdateLastUpdated = (recursiveIndex = 0) => async (confirmed:string ) => {
  if(!confirmed) {
    const newLastUpdate = await prompt.input('enter new date: ')
    const newDateInMilli = convertDate.milliseconds(newLastUpdate)
    const newDateInFull = convertDate.full(newDateInMilli)

    echo(yellow('I normalized the date for you: ') + newDateInFull)
    await prompt.confirm(`is this right?`, OnDeclineUpdateLastUpdated(recursiveIndex + 1))

    if(recursiveIndex == 0) {
      echo(yellow('updating last updated date...'))
      updateStacksFile({ lastUpdated: newDateInMilli })
      echo(yellow('...done'))
    }
  }
}

const OnDeclineResortTransactions = (transactions:Transactions) => async (confirmed:string) => {
  if(!confirmed) {
    const sortType = await prompt.choose('enter a sorting method:', ['date', 'stack'])
    const newlySortedTransactions = sortTransactions(transactions, sortType)

    addSpace()

    console.log(`EXPENSES (sorted by ${sortType})`)
    console.table(normalizeTransactions(newlySortedTransactions))
    await prompt.confirm('done sorting?', OnDeclineResortTransactions(transactions))
  }
}

const onConfirmUpdateStacks = async (confirmed:string) => {
  if(confirmed) {
    console.log("fake saving stacks")
  }
}

const audit = async () => {
  const { stacks, lastUpdated } = getOrSetStack()
  const orderedStacks = orderStacksByImportance(stacks)

  console.clear()
  addSpace()

  echo('---------- STACK COINS ----------')

  addSpace()

  echo(yellow('currently your stacks look like this.'))
  console.table(normalizeStacks(orderedStacks))
  await prompt.confirm('does this look right?')

  addSpace()

  console.log(yellow('the last time you did an audit was: '), convertDate.full(lastUpdated))
  await prompt.confirm('does this look right?', OnDeclineUpdateLastUpdated())

  addSpace()

  echo(green('---------- lets begin the audit ----------'))
  echo(yellow('processing transactions...'))
  const dirtyTransactions = getDirtyTransactions()
  updateTransactionsFile(dirtyTransactions)
  echo(yellow('...done.'))

  echo(yellow('calculating expenses...'))
  const {
    latestStacks,
    stackedTransactions: latestStackedTransactions,
    nonStackedTransactions: latestFreeTransactions,
    deposits
  } = calculateLatestExpenses()
  echo(yellow('...done.'))

  echo(yellow('calculating deposits...'))
  const { coins } = getOrSetIncome() //Update this to get all deposits
  const { fatStacks, stackPayments } = calculatePayDay(coins, latestStacks)
  echo(yellow('...done.'))

  addSpace()

  console.log("EXPENSES (sorted by stack)")
  const unsortedTransactions = [...latestStackedTransactions, ...latestFreeTransactions]
  const transactions = sortTransactions(unsortedTransactions, 'stack')
  console.table(normalizeTransactions(transactions))
  await prompt.confirm('is this sorted well?', OnDeclineResortTransactions(unsortedTransactions))

  addSpace()

  echo(yellow("CALCULATED EXPENSES"))
  console.table(compareStacks(stacks, orderStacksByImportance(latestStacks)))
  await prompt.confirm('does this look right?')

  addSpace()

  echo(yellow("CALCULATED DEPOSITS"))
  console.log(normalizePayDayExpenses(coins, stackPayments))
  console.table(compareFatStacks(latestStacks, fatStacks, stackPayments))
  await prompt.confirm('does this look right?')

  addSpace()

  echo(yellow("STACKS: final review"))
  console.table(collectGroupCoins(fatStacks))//Do more
  await prompt.confirm('does this look right?', onConfirmUpdateStacks)

  addSpace()

  echo(green("---------- audit is finished ----------"))
  echo(yellow("well done!").dim)

  addSpace()

}

(async () => await errorHandlerWrapper(audit, errorMessage))();

