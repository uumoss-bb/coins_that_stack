import filterTransactionsByDate from "../../businessLogic/filterTransactionsByDate"
import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import { convertDate } from "../../shared/normalizers"
import getTransactions from "../Transactions/getTransactions"
import getStacks from "./getStacks"

function calculateLatestExpenses() {
  const { stacks, lastUpdated } = getStacks()
  const normaleTransactions = getTransactions("FORT_FINANCIAL")
  const latestTransactions = filterTransactionsByDate(normaleTransactions, convertDate.full(lastUpdated))
  if(latestTransactions) {
    const { stacks: latestStacks, stackedTransactions, nonStackedTransactions } = linkStacksAndTrans(stacks, latestTransactions)
    return { latestStacks, stackedTransactions, nonStackedTransactions }
  } else {
    throw new Error('Missing latest transactions')
  }
}

export default calculateLatestExpenses
