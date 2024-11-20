import filterTransactionsByDate from "../../businessLogic/filterTransactionsByDate"
import linkData from "../../businessLogic/linkStacks&Transactions"
import { convertDate } from "../../shared/normalizers"
import getTransactions from "../Transactions/getTransactions"
import getStacks from "./getStacks"

function calculateLatestExpenses() {
  const { stacks, lastUpdated } = getStacks()
  const normaleTransactions = getTransactions("FORT_FINANCIAL")
  const latestTransactions = filterTransactionsByDate(normaleTransactions, convertDate.full(lastUpdated))
  if(latestTransactions) {
    const { stacks: latestStacks, stackedTransactions, nonStackedTransactions } = linkData(stacks, latestTransactions)
    return { latestStacks, stackedTransactions, nonStackedTransactions }
  } else {
    throw new Error('Missing latest transactions')
  }
}

export default calculateLatestExpenses
