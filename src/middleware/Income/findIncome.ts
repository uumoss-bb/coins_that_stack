import { selectTruthyItems } from "../../shared/selectors"
import { Transactions } from "../../shared/types/transactions"
import getIncomeFile from "./getIncomeFile"


function findIncome(transaction: Transactions) {
  const { keyword } = getIncomeFile()

  let totalBalance = 0
  const deposits = transaction.map(transaction => {
    if(transaction.title.includes(keyword)) {
      totalBalance += transaction.balance
      return transaction.balance
    }
    return null
  }).filter(selectTruthyItems)

  const averageCoins = totalBalance / deposits.length
  const lastDeposit = deposits.shift()
  return { averageCoins, lastDeposit }
}

export default findIncome
