import _Stacks, { StackClass } from "../middleware/Stacks";
import filterTransactionsByDate from "../businessLogic/filterTransactionsByDate";
import { convertDate } from "../shared/normalizers";
import { IncomeClass } from "./Income";

const WEEK_MS =  604800000

function audit(CurrentStacks: StackClass, Income: IncomeClass) {
  const { coins } = Income
  const { transactions } = CurrentStacks
  const now = Date.now()
  const twoWeekInPast = convertDate.full(now - (WEEK_MS * 2))
  const selectedTransactions = filterTransactionsByDate(transactions, twoWeekInPast)
  const LatestStacks = new _Stacks(selectedTransactions)

  return {
    LatestStacks
  }
}

export default audit
