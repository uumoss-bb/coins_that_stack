
import normalizeTransactions from "../../businessLogic/normalizeTransactions"
import FileSystem from "../../backend/FileSystem"
import { TRANSACTIONS_FILE_NAME } from "../../shared/enums/fileNames"
import { DirtyTransactions, TransSourceNames } from "../../shared/types/transactions"

const getTransactionsFile = () => {
  const { error, data: transactionsFile } = FileSystem.readPersonalFile(TRANSACTIONS_FILE_NAME)
  if(error) {
    throw new Error("getTransactions failed to get file")
  } else {
    return transactionsFile as DirtyTransactions
  }
}

const getTransactions = (source: TransSourceNames) => {
  const dirtyTransactions = getTransactionsFile()
  return normalizeTransactions(source, dirtyTransactions)
}

export default getTransactions
