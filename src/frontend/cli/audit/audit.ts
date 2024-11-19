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
  normalizeDeposits
} from './normalizers'
import { Stacks, StacksArray } from '../../../shared/types/stacks'
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

  echo(yellow('the last time you did an audit was: ') + convertDate.full(lastUpdated))
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
  } = calculateLatestExpenses()
  echo(yellow('...done.'))

  echo(yellow('calculating deposits...'))
  const { deposits, coins } = getRecentDeposits()
  const { fatStacks, stackPayments } = calculatePayDay(coins, latestStacks)
  echo(yellow('...done.'))

  addSpace()

  echo(yellow("EXPENSES (sorted by stack)"))
  const unsortedTransactions = [...latestStackedTransactions, ...latestFreeTransactions]
  const transactions = sortTransactions(unsortedTransactions, 'stack')
  console.table(normalizeTransactions(transactions))
  await prompt.confirm('is this sorted well?', OnDeclineResortTransactions(unsortedTransactions))

  addSpace()

  echo(yellow("CALCULATED EXPENSES"))
  console.table(compareStacks(stacks, orderStacksByImportance(latestStacks)))
  await prompt.confirm('does this look right?')

  addSpace()

  echo(yellow("DEPOSITS"))

  const sortedDeposits = sortTransactions(deposits, 'date')
  console.table(normalizeDeposits(sortedDeposits))
  await prompt.confirm('does this look right?')

  addSpace()

  echo(yellow("STACKING COINS"))
  const {
    totalIncome,
    payDayExpenses,
    remaining
  } = normalizePayDayExpenses(coins, stackPayments)
  echo(`${green('new coins:')} ${totalIncome} | ${green('stacked coins:')} ${payDayExpenses} | ${green('remaining coin:')} ${remaining}`)
  console.table(compareFatStacks(latestStacks, fatStacks, stackPayments))//TODO: ill need indicators of whats passed the incidence check
  await prompt.confirm('does this look right?')

  addSpace()

  echo(yellow("STACKS: final review"))
  const newLastUpdated = convertDate.milliseconds(convertDate.full(Date.now()))
  let newStacks: StacksArray|Stacks = prepareForUpdate(fatStacks) as StacksArray
  newStacks = transformStacksToObject(newStacks) as Stacks
  const orderedNewStacks = orderStacksByImportance(newStacks)
  echo(yellow('Date saved as: ') + convertDate.full(newLastUpdated))
  console.table(normalizeStacks(orderedNewStacks))
  console.table(collectGroupCoins(fatStacks))
  await prompt.confirm('does this look right?')
  updateStacksFile({ ...newStacks, lastUpdated: newLastUpdated })

  addSpace()

  echo(green("---------- audit is finished ----------"))
  echo(yellow("well done!").dim)

  addSpace()

}

(async () => await errorHandlerWrapper(audit, errorMessage))();

