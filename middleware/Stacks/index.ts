import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { Stack, Stacks } from "../../shared/types/stacks"
import { Transactions } from "../../shared/types/transactions"
import init from "./init"
import summarizeStackExpenses from "./summarizeStackExpenses_cli"
import summarizeTotal from "./summarizeTotal_cli"

class _Stacks {

  private stacks: Stacks
  private transactions: Transactions

  constructor() {
    const { stacks, transactions } = init()
    this.stacks = stacks
    this.transactions = transactions
  }

  summarizeExpenses = summarizeStackExpenses
  summarizeTotal = summarizeTotal

  getTransactions() {
    return this.transactions
  }

  getStack(stackName: string) {
    return this.stacks[stackName]
  }

  updateStack(stack: Stack) {
    const { error, data: stackFile } = FileSystem.updateJsonFile(STACK_FILE_NAME, { [stack.name]: stack })
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.stacks = stackFile as Stacks
  }

  getStacks() {
    return this.stacks
  }

  updateStacks(stacks: Stack) {
    const { error, data: stackFile } = FileSystem.updateJsonFile(STACK_FILE_NAME, { ...stacks })
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.stacks = stackFile as Stacks
  }
}

export type StackClass = _Stacks

export default _Stacks
