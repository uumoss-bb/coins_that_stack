import FileSystem from "../../database/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import { selectTruthyItems } from "../../shared/selectors"
import Income from "../../shared/types/income"
import { Transactions } from "../../shared/types/transactions"

class _Income {

  updateIncome(newIncome: Income) {
    const { error, data } = FileSystem.updateJsonFile(INCOME_FILE_NAME, newIncome)
    if(error) {
      throw new Error("Failed to set new income")
    }
    const income = data as Income
    this.#keyword = income.keyword
    this.#coins = income.coins
  }

  getStackAllocations() {
    //TODO: I want to know what percentage each stack is pulling from Income
  }
}

export type IncomeClass = _Income

export default _Income
