import filterTransactionsByDate from "../../businessLogic/filterTransactionsByDate"
import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { convertDate } from "../../shared/normalizers"
import { Stacks, StacksFile } from "../../shared/types/stacks"
import { Transactions } from "../../shared/types/transactions"
import getTransactions from "../getTransactions"
import { IncomeClass } from "../Income"

type CalculateLatestExpensesResult = { stacks: Stacks, transactions: Transactions, freeTransactions: Transactions, error: string | undefined }
type CalculatePayDayResult = { stacks: Stacks, error: string | undefined }

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

  constructor(_transactions: Transactions | null = null) {
    const { lastUpdated, ...stacks } = this.getStackFile()
    this.#lastUpdated = lastUpdated
    this.#stacks = stacks
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
      const { stacks, transactions, freeTransactions } = linkStacksAndTrans(this.#stacks, latestTransactions)
      return { stacks, transactions, freeTransactions, error: undefined}
    } else {
      return { stacks: this.#stacks, transactions: [], freeTransactions: [], error: 'Missing latest transactions' }
    }
  }

  // calculatePayDay(income: number): CalculatePayDayResult {
  //   // if(latestTransactions) {
  //   //   const { stacks, transactions, freeTransactions } = linkStacksAndTrans(this.#stacks, latestTransactions)
  //   //   return { stacks, error: undefined }
  //   // } else {
  //   //   return { stacks: this.#stacks, error: 'Missing latest transactions' }
  //   // }
  // }
}

export type StackClass = _Stacks

export default _Stacks
