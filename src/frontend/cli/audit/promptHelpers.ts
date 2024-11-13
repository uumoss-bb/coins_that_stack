import { yellow } from '../../../shared/colors'
import { echo } from 'shelljs'
import { updateStacksFile } from '../../../middleware/Stacks'
import { convertDate } from '../../../shared/normalizers'
import * as prompt from '../../../shared/cliPrompt'
import { Transactions } from '../../../shared/types/transactions'
import sortTransactions from '../../../businessLogic/sortTransactions'
import { normalizeTransactions } from './normalizers'

const addSpace = () => echo('\n')

const OnDeclineUpdateLastUpdated = (recursiveIndex = 0) => async (confirmed:string ) => {
  if(!confirmed) {
    const newLastUpdate = await prompt.input('enter new date: ')
    const newDateInMilli = convertDate.milliseconds(newLastUpdate)
    const newDateInFull = convertDate.full(newDateInMilli)

    echo(yellow('I normalized the date for you: ') + newDateInFull)
    await prompt.confirm(`is this right?`, OnDeclineUpdateLastUpdated(recursiveIndex + 1))

    if(recursiveIndex == 0) {//TODO: This is failing
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
    echo(yellow(`EXPENSES (sorted by ${sortType})`))
    console.table(normalizeTransactions(newlySortedTransactions))
    await prompt.confirm('done sorting?', OnDeclineResortTransactions(transactions))
  }
}

const onConfirmUpdateStacks = async (confirmed:string) => {
  if(confirmed) {
    console.log("fake saving stacks")
  }
}

export {
  OnDeclineResortTransactions,
  OnDeclineUpdateLastUpdated,
  onConfirmUpdateStacks
}
