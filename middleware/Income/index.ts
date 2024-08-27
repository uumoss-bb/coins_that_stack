import FileSystem from "../../database/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import Income from "../../shared/types/income"

class _Income {

  #income: Income
  #coins: number
  get income() { return this.#income }
  get coins() { return this.#coins }

  constructor() {
    const { error, data: incomeFile } = FileSystem.readJsonFile(INCOME_FILE_NAME)
    if(error) {
      throw new Error("Income Init failed to get file")
    } else {
      this.#income = incomeFile as Income
      this.#coins = this.#income.coins
    }
  }

  updateIncome(income: Income) {
    const { error, data: incomeFile } = FileSystem.updateJsonFile(INCOME_FILE_NAME, income)
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.#income = incomeFile as Income
  }

  getStackAllocations() {
    //TODO: I want to know what percentage each stack is pulling from Income
  }
}

export type IncomeClass = _Income

export default _Income
