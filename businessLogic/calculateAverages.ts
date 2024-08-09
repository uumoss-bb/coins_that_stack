import { Transaction } from "../shared/types/transactions";


const calculateAverages = (groupsTransactions: Transaction[]) => {
  const totalCoin = groupsTransactions.reduce((prevValue, transaction) => {
    return prevValue + transaction.transaction
  }, 0)

  const average = totalCoin / groupsTransactions.length
  console.log(average)
  return average
}

export default calculateAverages
