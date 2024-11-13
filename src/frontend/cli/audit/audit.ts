#!/usr/bin/env node
import { echo } from 'shelljs'
import { green, yellow } from '../../../shared/colors'
import errorHandlerWrapper from '../../../shared/errorHandlerWrapper'
import { defaultIncome, defaultStacks } from '../../../shared/defaultData'
import { convertDate } from '../../../shared/normalizers'
import * as prompt from '../../../shared/cliPrompt'
import orderStacksByImportance from '../../../businessLogic/orderStacksByImportance'
import sortTransactions from '../../../businessLogic/sortTransactions'
import { calculateLatestExpenses, calculatePayDay, getStacks, updateStacksFile } from '../../../middleware/Stacks'
import { getIncomeFile, getRecentDeposits, updateIncomeFile } from '../../../middleware/Income'
import { getDirtyTransactions, updateTransactionsFile } from '../../../middleware/Transactions'
import {
  onConfirmUpdateStacks,
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

const errorMessage = 'FAILED to Audit'

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
  console.table(collectGroupCoins(fatStacks))//TODO: Do more
  await prompt.confirm('does this look right?', onConfirmUpdateStacks)

  addSpace()

  echo(green("---------- audit is finished ----------"))
  echo(yellow("well done!").dim)

  addSpace()

}

(async () => await errorHandlerWrapper(audit, errorMessage))();

