import addCoinsToStacks from "../../businessLogic/addCoinsToStacks"
import filterTransactionsByDate from "../../businessLogic/filterTransactionsByDate"
import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import orderStacksByImportance from "../../businessLogic/orderStacksByImportance"
import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { convertDate } from "../../shared/normalizers"
import { Stacks, StacksArray, StacksFile } from "../../shared/types/stacks"
import { Transactions } from "../../shared/types/transactions"
import getTransactions from "../transactions/getTransactions"

type CalculateLatestExpensesResult = { latestStacks: Stacks, deposits: Transactions, stackedTransactions: Transactions, nonStackedTransactions: Transactions, error: string | undefined }

class _Stacks {

  calculateLatestExpenses(): CalculateLatestExpensesResult {
    const normaleTransactions = getTransactions("FORT_FINANCIAL")
    const latestTransactions = filterTransactionsByDate(normaleTransactions, convertDate.full(this.#lastUpdated))
    if(latestTransactions) {
      const { stacks: latestStacks, stackedTransactions, nonStackedTransactions } = linkStacksAndTrans(this.#stacks, latestTransactions)
      return { latestStacks, stackedTransactions, nonStackedTransactions, error: undefined}
    } else {
      return { latestStacks: this.#stacks, stackedTransactions: [], nonStackedTransactions: [], error: 'Missing latest transactions' }
    }
  }

  calculatePayDay(coins: number): StacksArray {
    const orderedStacks = orderStacksByImportance(this.#stacks)
    const fatStacks = addCoinsToStacks(coins, orderedStacks)
    return fatStacks
  }
}

export type StackClass = _Stacks

export default _Stacks
