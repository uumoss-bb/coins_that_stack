#!/usr/bin/env node
import { echo } from 'shelljs'
import { green, yellow } from '../../../shared/colors'
import errorHandlerWrapper from '../../../shared/errorHandlerWrapper'
import { defaultStacks } from '../../../shared/defaultData'
import { convertDate } from '../../../shared/normalizers'
import * as prompt from '../../../shared/cliPrompt'
import orderStacksByImportance from '../../../businessLogic/orderStacksByImportance'
import sortTransactions from '../../../businessLogic/sortTransactions'
import { calculateLatestExpenses, calculatePayDay, getStacks, updateStacksFile } from '../../../middleware/Stacks'
import { getRecentDeposits } from '../../../middleware/Income'
import { getDirtyTransactions, updateTransactionsFile } from '../../../middleware/Transactions'
import {
  OnDeclineEditStacks,
  OnDeclineResortTransactions,
  OnDeclineUpdateLastUpdated
} from './promptHelpers'
import {
  normalizeStacks,
  normalizeTransactions,
  normalizePayDayExpenses,
  compareStacks,
  compareFatStacks,
  collectGroupCoins,
  normalizeDeposits,
  prepareForUpdate,
  transformStacksToObject
} from './normalizers'
import { Stack, StackPayments, Stacks, StacksArray } from '../../../shared/types/stacks'
import { Transactions } from '../../../shared/types/transactions'

const errorMessage = 'FAILED to Audit'

const addSpace = () => echo('\n')

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

export const displayStacks = async (stacks: Stacks, shouldPrompt: boolean = true) => {
  const orderedStacks = orderStacksByImportance(stacks)
  echo(yellow('currently your stacks look like this.'))
  console.table(normalizeStacks(orderedStacks))
  if(shouldPrompt) {
    await prompt.confirm('does this look right?', OnDeclineEditStacks(stacks))
  }
}

export const displayLastUpdated = async (lastUpdated: number) => {
  echo(yellow('the last time you did an audit was: ') + convertDate.full(lastUpdated))
  await prompt.confirm('does this look right?', OnDeclineUpdateLastUpdated())
}

const processAllData = async () => {
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
  } = calculateLatestExpenses()
  echo(yellow('...done.'))

  echo(yellow('calculating deposits...'))
  const { deposits, income } = getRecentDeposits()
  const { fatStacks, stackPayments } = calculatePayDay(income, latestStacks)
  echo(yellow('...done.'))

  return {
    latestStacks,
    latestStackedTransactions,
    latestFreeTransactions,
    deposits, income,
    fatStacks,
    stackPayments
  }
}

type DisplayStackExpenses = { latestStackedTransactions: Transactions, latestFreeTransactions: Transactions }
export const displayExpenseTransactions = async ({ latestStackedTransactions, latestFreeTransactions }: DisplayStackExpenses) => {
  echo(yellow("EXPENSES (sorted by stack)"))
  const unsortedTransactions = [...latestStackedTransactions, ...latestFreeTransactions]
  const transactions = sortTransactions(unsortedTransactions, 'stack')
  console.table(normalizeTransactions(transactions))
  await prompt.confirm('is this sorted well?', OnDeclineResortTransactions(unsortedTransactions))
}

type DisplayStackMinusExpenses = { stacks: Stacks, latestStacks: Stacks }
export const displayStackMinusExpenses = async ({ stacks, latestStacks }: DisplayStackMinusExpenses) => {
  echo(yellow("CALCULATED EXPENSES"))
  console.table(compareStacks(stacks, orderStacksByImportance(latestStacks)))
  await prompt.confirm('does this look right?')
}

export const displayDeposits = async (deposits: Transactions) => {
  echo(yellow("DEPOSITS"))
  const sortedDeposits = sortTransactions(deposits, 'date')
  console.table(normalizeDeposits(sortedDeposits))
  await prompt.confirm('does this look right?')
}

type DisplayStackPlusIncome = { income: number, stackPayments: StackPayments, latestStacks: Stacks, fatStacks: StacksArray }
export const displayStackPlusIncome = async ({ income, stackPayments, latestStacks, fatStacks }: DisplayStackPlusIncome) => {
  echo(yellow("STACKING COINS"))
  const {
    totalIncome,
    payDayExpenses,
    remaining
  } = normalizePayDayExpenses(income, stackPayments)
  echo(`${green('new coins:')} ${totalIncome} | ${green('stacked coins:')} ${payDayExpenses} | ${green('remaining coin:')} ${remaining}`)
  console.table(compareFatStacks(latestStacks, fatStacks, stackPayments))
  await prompt.confirm('does this look right?')
}

const reviewAndAcceptAudit = async (fatStacks: StacksArray) => {
  echo(yellow("STACKS: final review"))
  const newLastUpdated = convertDate.milliseconds(convertDate.full(Date.now()))
  let newStacks: StacksArray|Stacks = prepareForUpdate(fatStacks) as StacksArray
  newStacks = transformStacksToObject(newStacks) as Stacks
  const orderedNewStacks = orderStacksByImportance(newStacks)
  echo(yellow('Date saved as: ') + convertDate.full(newLastUpdated))
  console.table(normalizeStacks(orderedNewStacks))
  console.table(collectGroupCoins(fatStacks))
  await prompt.confirm('would you like to update your stacks?')
  await prompt.confirm('are you sure?')
  updateStacksFile({ ...newStacks, lastUpdated: newLastUpdated })
}

const audit = async () => {
  const { stacks, lastUpdated } = getOrSetStack()

  console.clear()
  addSpace()
  echo('---------- STACK COINS ----------')
  addSpace()
  await displayStacks(stacks)
  addSpace()
  await displayLastUpdated(lastUpdated)
  addSpace()
  const {
    latestStacks,
    latestStackedTransactions,
    latestFreeTransactions,
    deposits, income,
    fatStacks,
    stackPayments
  } = await processAllData()
  addSpace()
  if([...latestFreeTransactions, ...latestStackedTransactions].length) {
    await displayExpenseTransactions({ latestStackedTransactions, latestFreeTransactions })
    addSpace()
    await displayStackMinusExpenses({ stacks, latestStacks })
  } else {
    echo(yellow("EXPENSES: you have no expenses to calculate"))
    await prompt.confirm('does this seem right?')
  }
  addSpace()
  if(deposits.length) {
    await displayDeposits(deposits)
    addSpace()
    await displayStackPlusIncome({ income, stackPayments, latestStacks, fatStacks })
  } else {
    echo(yellow("PAYDAY: you have no income to calculate"))
    await prompt.confirm('does this seem right?')
  }
  addSpace()
  await reviewAndAcceptAudit(fatStacks)
  addSpace()
  echo(green("---------- audit is finished ----------"))
  echo(yellow("well done!").dim)
  addSpace()

}

(async () => await errorHandlerWrapper(audit, errorMessage))();

