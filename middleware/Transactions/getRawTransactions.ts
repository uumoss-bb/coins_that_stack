
import FileSystem from "../../database/FileSystem"
import { DirtyTransactions } from "../../shared/types/transactions"

const getTransactionsFile = () => {
  const { error, data: transactionsFile } = FileSystem.readFile('./transactions/index.json')
  if(error) {
    throw new Error("getRawTransactions failed to get file")
  } else {
    return transactionsFile as DirtyTransactions
  }
}

const dedupe = (transactions: DirtyTransactions): DirtyTransactions => {
  const transObj = transactions.reduce((prevValue, transaction) => {
    return {
      ...prevValue,
      [JSON.stringify(transaction)]: transaction
    }
  }, {})

  return Object.values(transObj)
}

const getRawTransactions = () => {
  let dirtyTransactions = getTransactionsFile()
  dirtyTransactions = dedupe(dirtyTransactions)
  return dirtyTransactions
}

export default getRawTransactions
