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

  #lastUpdated: number
  #stacks: Stacks
  get stacks() { return this.#stacks }
  get lastUpdated() { return this.#lastUpdated }
  private set lastUpdated(date: number) { this.#lastUpdated = date }

  private getStackFile() {
    const { error, data: stackFile } = FileSystem.readJsonFile(STACK_FILE_NAME)
    if(error) {
      throw new Error("Stacks Init failed to get stacks file")
    } else {
      return stackFile as StacksFile
    }
  }

  constructor(_lasUpdated?: number, _stacks?: Stacks) {
    const preSetStacks = { lastUpdated: _lasUpdated, ..._stacks }
    const { lastUpdated, ...stacks } = _lasUpdated && _stacks ? preSetStacks : this.getStackFile()
    this.#lastUpdated = lastUpdated as number
    this.#stacks = stacks as Stacks
  }

  updateStacks(newStacks: Stacks) {
    const { error } = FileSystem.updateJsonFile(STACK_FILE_NAME, newStacks)
    if(error) {
      throw new Error("Failed to update stacks")
    }

    this.#stacks = { ...newStacks, ...this.#stacks }
  }

  updateLastUpdated(date: string) {
    const lastUpdated = convertDate.milliseconds(date)
    const { error } = FileSystem.updateJsonFile(STACK_FILE_NAME, { lastUpdated })
    if(error) {
      throw new Error("Failed to update last updated")
    }

    this.lastUpdated = lastUpdated
  }

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
