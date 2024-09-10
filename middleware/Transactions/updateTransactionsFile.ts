import { TRANSACTIONS_FILE_NAME } from "../../shared/enums/fileNames"
import { DirtyTransactions, Transactions } from "../../shared/types/transactions"
import FileSystem from "../../database/FileSystem"

const updateTransactionsFile = (transactions: DirtyTransactions) => {
  const { error, data: transactionsFile } = FileSystem.writeJsonFile(TRANSACTIONS_FILE_NAME, transactions)
  if(error) {
    throw new Error("Failed to update transactions")
  }

  return transactionsFile as DirtyTransactions
}


export default updateTransactionsFile
