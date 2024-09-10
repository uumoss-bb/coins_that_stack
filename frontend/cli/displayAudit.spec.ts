import audit from '../../middleware/audit'
import _Stacks from '../../middleware/Stacks'
import _Income from '../../middleware/Income'
import { Transactions } from '../../shared/types/transactions'
import { convertDate } from '../../shared/normalizers'
import sortTransactions from '../../businessLogic/sortTransactions'

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, transaction, stacks}) => ({title, date: convertDate.full(date), transaction, stacks}))

it("AUDIT", () => {
  const Income = new _Income()
  const CurrentStacks = new _Stacks()
  const {
    latestStacks,
    latestStackChanges,
    latestFreeTransactions,
    latestStackedTransactions
  } = audit(CurrentStacks, Income)
  const transactions = sortTransactions([...latestStackedTransactions, ...latestFreeTransactions], 'stack')

  console.log("NEW STACK CHANGES")
  console.table(latestStackChanges)
  console.log("LATEST STACKS")
  console.table(latestStacks)
  console.log("TRANSACTIONS")
  console.table(normalizeTransactions(transactions))
})
