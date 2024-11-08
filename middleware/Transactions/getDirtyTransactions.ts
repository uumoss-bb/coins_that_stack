
import FileSystem from "../../database/FileSystem"
import { DIRTY_TRANSACTIONS } from "../../shared/enums/fileNames"
import { DirtyTransactions } from "../../shared/types/transactions"

const getTransactionsFile = () => {
  const { error, data: transactionsFile } = FileSystem.readFile(`${DIRTY_TRANSACTIONS}/index.json`)
  if(error) {
    FileSystem.checkStorageExists(DIRTY_TRANSACTIONS)
    FileSystem.writeFile(`${DIRTY_TRANSACTIONS}/index.json`, [])
    return []
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
