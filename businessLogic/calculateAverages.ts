import { Transaction } from "../shared/types/transactions";


const calculateAverages = (stackTransactions: Transaction[]) => {
  const totalCoin = stackTransactions.reduce((prevValue, transaction) => {
    return prevValue + transaction.transaction
  }, 0)

  const average = totalCoin / stackTransactions.length
  console.log(average)
  return average
}

export default calculateAverages
