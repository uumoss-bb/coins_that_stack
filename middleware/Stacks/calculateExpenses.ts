import filterTransactionsByDate from "../../businessLogic/filterTransactionsByDate"
import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import { convertDate } from "../../shared/normalizers"
import { Stacks } from "../../shared/types/stacks"
import { Transactions } from "../../shared/types/transactions"
import getTransactions from "../Transactions/getTransactions"
import getStacks from "./getStacks"


type CalculateLatestExpensesResult = { latestStacks: Stacks, deposits: Transactions, stackedTransactions: Transactions, nonStackedTransactions: Transactions, error: string | undefined }

function calculateLatestExpenses(): CalculateLatestExpensesResult {
  const { stacks, lastUpdated } = getStacks()
  const normaleTransactions = getTransactions("FORT_FINANCIAL")
  const latestTransactions = filterTransactionsByDate(normaleTransactions, convertDate.full(lastUpdated))
  if(latestTransactions) {
    const { stacks: latestStacks, stackedTransactions, nonStackedTransactions, deposits } = linkStacksAndTrans(stacks, latestTransactions)
    return { latestStacks, stackedTransactions, nonStackedTransactions, deposits, error: undefined}
  } else {
    return { error: 'Missing latest transactions', latestStacks: stacks, stackedTransactions: [], nonStackedTransactions: [], deposits: [] }
  }
}

export default calculateLatestExpenses
