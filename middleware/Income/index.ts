import FileSystem from "../../database/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import { selectTruthyItems } from "../../shared/selectors"
import Income from "../../shared/types/income"
import { Transactions } from "../../shared/types/transactions"

class _Income {

  #keyword: string
  #coins: number
  get coins() { return this.#coins }

  constructor() {
    const { error, data } = FileSystem.readJsonFile(INCOME_FILE_NAME)
    if(error) {
      throw new Error("Income Init failed to get file")
    } else {
      const income = data as Income
      this.#keyword = income.keyword
      this.#coins = income.coins
    }
  }

  findIncome(transaction: Transactions) {
    let totalBalance = 0
    const incomes = transaction.map(transaction => {
      if(transaction.title.includes(this.#keyword)) {
        totalBalance += transaction.balance
        return transaction.balance
      }
      return null
    }).filter(selectTruthyItems)

    const averageCoins = totalBalance / incomes.length
    const latestCoin = incomes.shift()
    return { averageCoins, latestCoin }
  }

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
