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
import { formatToCurrency } from '../../shared/normalizers'
import { confirm } from '../../shared/cliPrompt'

const errorMessage = 'you are not a true dragon born.'

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
  console.clear()
  echo(rainbow('Time to Stack Them Coins.'))
  const { stacks, lastUpdated } = getOrSetStack()
  const orderedStacks = orderStacksByImportance(stacks)

  console.table(normalizeStacks(orderedStacks))
  await confirm('How do your stacks look?')
}

(async () => await errorHandlerWrapper(audit, errorMessage))();
