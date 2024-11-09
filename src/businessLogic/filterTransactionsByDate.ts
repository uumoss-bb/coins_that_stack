import { convertDate } from "../shared/normalizers"
import { Transactions, Transaction } from "../shared/types/transactions"

const EarlierThanEndDate = (endDate: string) => (transaction: Transaction) => {
  const milliEndDate = convertDate.milliseconds(endDate)
  if(transaction.date <= milliEndDate) {
    return transaction
  }
}

const LaterThanStartDate = (startDate: string) => (transaction: Transaction) => {
  const milliStartDate = convertDate.milliseconds(startDate)
  if(transaction.date >= milliStartDate) {
    return transaction
  }
}

const BetweenStartAndEnd = (startDate: string,  endDate: string) => (transaction: Transaction) => {
  const milliStartDate = convertDate.milliseconds(startDate)
  const milliEndDate = convertDate.milliseconds(endDate)
  if(transaction.date >= milliStartDate && transaction.date <= milliEndDate) {
    return transaction
  }
}

const filterTransactionsByDate = (transactions: Transactions, startDate: string|null = null, endDate: string|null = null) => {
  if(startDate && endDate) {
    return transactions.filter(BetweenStartAndEnd(startDate, endDate))
  }

  if(startDate && !endDate) {
    return transactions.filter(LaterThanStartDate(startDate))
  }

  if(!startDate && endDate) {
    return transactions.filter(EarlierThanEndDate(endDate))
  }
}

export default filterTransactionsByDate
