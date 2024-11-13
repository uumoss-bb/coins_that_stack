import filterTransactionsByDate from "../../businessLogic/filterTransactionsByDate"
import linkStacksAndTrans from "../../businessLogic/linkStacksAndTrans"
import { convertDate } from "../../shared/normalizers"
import getTransactions from "../Transactions/getTransactions"
import getStacks from "../Stacks/getStacks"
import { Transactions } from "../../shared/types/transactions"

const depositSum = (deposit: Transactions) => deposit.map(({ coins }) => coins).concat()

function getRecentDeposits() {
  const { stacks, lastUpdated } = getStacks()
  const normaleTransactions = getTransactions("FORT_FINANCIAL")
  const latestTransactions = filterTransactionsByDate(normaleTransactions, convertDate.full(lastUpdated))
  if(latestTransactions) {
    const { deposits } = linkStacksAndTrans(stacks, latestTransactions)
    return { deposits, coins: depositSum(deposits) }
  } else {
    throw new Error('Missing latest transactions')
  }
}

export default getRecentDeposits
