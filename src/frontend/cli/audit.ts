#!/usr/bin/env node
import { rainbow, yellow } from '../../shared/colors'
import { exec, echo } from 'shelljs'
import inquirer from 'inquirer'
import errorHandlerWrapper from '../../shared/errorHandlerWrapper'
import { calculateLatestExpenses, getStacks, updateStacksFile } from '../../middleware/Stacks'
import { defaultIncome, defaultStacks } from '../../shared/defaultData'
import { getIncomeFile, updateIncomeFile } from '../../middleware/Income'
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { Stacks, StacksArray } from '../../shared/types/stacks'
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
  if(confirmed) {
    const sortType = await prompt.choose('enter a sorting method:', ['date', 'stack'])
    const newlySortedTransactions = sortTransactions(transactions, sortType)

    addSpace()

    console.log(`EXPENSES (sorted by ${sortType})`)
    console.table(normalizeTransactions(newlySortedTransactions))
    await prompt.confirm('would you like to resort?', OnDeclineResortTransactions(transactions))
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

  addSpace()

  const unsortedTransactions = [...latestStackedTransactions, ...latestFreeTransactions]
  const transactions = sortTransactions(unsortedTransactions, 'stack')
  console.log("EXPENSES (sorted by stack)")
  console.table(normalizeTransactions(transactions))
  await prompt.confirm('would you like to resort?', OnDeclineResortTransactions(unsortedTransactions))

  addSpace()

  echo(yellow("CALCULATED EXPENSES"))
  console.table(compareStacks(stacks, orderStacksByImportance(latestStacks)))
  await prompt.confirm('does this look right?')
}

(async () => await errorHandlerWrapper(audit, errorMessage))();

