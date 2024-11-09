#!/usr/bin/env node
import { rainbow, yellow } from '../../shared/colors'
import { exec, echo } from 'shelljs'
import inquirer from 'inquirer'
import errorHandlerWrapper from '../../shared/errorHandlerWrapper'
import { getStacks, updateStacksFile } from '../../middleware/Stacks'
import { defaultIncome, defaultStacks } from '../../shared/defaultData'
import { getIncomeFile, updateIncomeFile } from '../../middleware/Income'
import orderStacksByImportance from '../../businessLogic/orderStacksByImportance'
import { StacksArray } from '../../shared/types/stacks'
import { convertDate, formatToCurrency } from '../../shared/normalizers'
import { confirm } from '../../shared/cliPrompt'
import { getDirtyTransactions, updateTransactionsFile } from '../../middleware/Transactions'

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

const normalizeStacks = (stacks: StacksArray) =>
  stacks.map(({name, coins, group}) => ({
    name,
    coins: formatToCurrency(coins),
    group: group || null
  }))

const audit = async () => {
  const { stacks, lastUpdated } = getOrSetStack()
  const orderedStacks = orderStacksByImportance(stacks)

  console.clear()
  addSpace()

  echo('---------- STACK COINS ----------')

  addSpace()

  console.log(yellow('The last time you audited: '), convertDate.full(lastUpdated))
  await confirm('Does this look right?')

  addSpace()

  echo(yellow('Your Stacks'))
  console.table(normalizeStacks(orderedStacks))
  await confirm('Does this look right?')

  addSpace()

  echo(yellow('processing transactions...'))
  const dirtyTransactions = getDirtyTransactions()
  updateTransactionsFile(dirtyTransactions)
  echo(yellow('...done.'))
}

(async () => await errorHandlerWrapper(audit, errorMessage))();
