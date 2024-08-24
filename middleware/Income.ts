import FileSystem from "../database/FileSystem"
import { INCOME_FILE_NAME } from "../shared/enums/fileNames"
import Income from "../shared/types/income"

const defaultIncome: Income = {
  coins: 0
}

class _Income {

  private income: Income

  constructor() {
    const { error, data: incomeFile } = FileSystem.readJsonFile(INCOME_FILE_NAME)
    if(error) {
      FileSystem.writeJsonFile(INCOME_FILE_NAME, {})
      this.income = defaultIncome
    } else {
      this.income = incomeFile as Income
    }
  }

  getCoins() {
    return this.income.coins
  }

  updateIncome(income: Income) {
    const { error, data: incomeFile } = FileSystem.updateJsonFile(INCOME_FILE_NAME, income)
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.income = incomeFile as Income
  }

  getStackAllocations() {
    //TODO: I want to know what percentage each stack is pulling from Income
  }
}

export default _Income
