import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import normalizeTransactions from "../../businessLogic/normalizeTransactions"
import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME, TRANSACTIONS_FILE_NAME } from "../../shared/enums/fileNames"
import { StacksFile } from "../../shared/types/stacks"
import { DirtyTransactions, Transactions } from "../../shared/types/transactions"

function getStackFile() {
  const { error, data: stackFile } = FileSystem.readJsonFile(STACK_FILE_NAME)
  if(error) {
    throw new Error("Stacks Init failed to get stacks file")
  } else {
    return stackFile as StacksFile
  }
}

function getTransactionsFile() {
  const { error, data: transactionsFile } = FileSystem.readJsonFile(TRANSACTIONS_FILE_NAME)
  if(error) {
    return []
  } else {
    return transactionsFile as DirtyTransactions
  }
}

const init = function(transactions: Transactions | null) {
  let normalizedTransactions = transactions || {} as Transactions
  if(!transactions) {
    const transactionsFile = getTransactionsFile()
    normalizedTransactions = normalizeTransactions({ source: "FORT_FINANCIAL", transactions: transactionsFile })
  }
  const { lastUpdated, ...stacks } = getStackFile()
  return {
    lastUpdated,
    ...linkStacksAndTrans(stacks, normalizedTransactions)
  }
}

export default init
