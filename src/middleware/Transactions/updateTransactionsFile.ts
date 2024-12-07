import { TRANSACTIONS_FILE_NAME } from "../../shared/enums/fileNames"
import { DirtyTransactions, Transactions } from "../../shared/types/transactions"
import FileSystem from "../../backend/FileSystem"

const updateTransactionsFile = (transactions: DirtyTransactions) => {
  const { error, data: transactionsFile } = FileSystem.writePersonalFile(TRANSACTIONS_FILE_NAME, transactions)
  if(error) {
    throw new Error("Failed to update transactions")
  }

  return transactionsFile as DirtyTransactions
}


export default updateTransactionsFile
