
import FileSystem from "../../database/FileSystem"
import { DIRTY_TRANSACTIONS_FILE_NAME } from "../../shared/enums/fileNames"
import { DirtyTransactions } from "../../shared/types/transactions"

const getTransactionsFile = () => {
  const { error, data: transactionsFile } = FileSystem.readFile(DIRTY_TRANSACTIONS_FILE_NAME)
  if(error) {
    throw new Error("getDirtyTransactions failed to get file")
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

const getDirtyTransactions = () => {
  let dirtyTransactions = getTransactionsFile()
  dirtyTransactions = dedupe(dirtyTransactions)
  return dirtyTransactions
}

export default getDirtyTransactions
