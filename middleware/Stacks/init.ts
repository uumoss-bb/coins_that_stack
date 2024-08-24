import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import normalizeTransactions from "../../businessLogic/normalizeTransactions"
import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME, TRANSACTIONS_FILE_NAME } from "../../shared/enums/fileNames"
import { Stacks } from "../../shared/types/stacks"
import { DirtyTransactions } from "../../shared/types/transactions"

function getStackFile() {
  const { error, data: stackFile } = FileSystem.readJsonFile(STACK_FILE_NAME)
  if(error) {
    FileSystem.writeJsonFile(STACK_FILE_NAME, {})
    return {}
  } else {
    return stackFile as Stacks
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

const init = function() {
  const stackFile = getStackFile()
  const transactionsFile = getTransactionsFile()
  const normalizedTransactions = normalizeTransactions({ source: "FORT_FINANCIAL", transactions: transactionsFile })
  return linkStacksAndTrans(stackFile, normalizedTransactions)
}

export default init
