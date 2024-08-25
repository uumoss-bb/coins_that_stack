import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { convertDate } from "../../shared/normalizers"
import { Stacks } from "../../shared/types/stacks"
import { Transactions } from "../../shared/types/transactions"
import init from "./init"
import summarizeStackExpenses from "./summarizeStackExpenses_cli"
import summarizeTotal from "./summarizeTotal_cli"

class _Stacks {

  #lastUpdated: number
  #stacks: Stacks
  #transactions: Transactions
  get transactions() { return this.#transactions }
  get stacks() { return this.#stacks }
  get lastUpdated() { return this.#lastUpdated }


  constructor() {
    const { lastUpdated, stacks, transactions } = init()
    this.#stacks = stacks
    this.#transactions = transactions
    this.#lastUpdated = lastUpdated
  }

  summarizeExpenses = summarizeStackExpenses
  summarizeTotal = summarizeTotal

  updateStacks(newStacks: Stacks) {
    const { error } = FileSystem.updateJsonFile(STACK_FILE_NAME, newStacks)
    if(error) {
      throw new Error("Failed to update stacks")
    }

    const updatedStacks = { ...this.#stacks, ...newStacks }
    const { stacks, transactions } = linkStacksAndTrans(updatedStacks, this.#transactions)
    this.#stacks = stacks
    this.#transactions = transactions
  }

  updateLastUpdated(date: string) {
    const lastUpdated = convertDate.milliseconds(date)
    const { error } = FileSystem.updateJsonFile(STACK_FILE_NAME, { lastUpdated })
    if(error) {
      throw new Error("Failed to update last updated")
    }

    this.#lastUpdated = lastUpdated
  }
}

export type StackClass = _Stacks

export default _Stacks
