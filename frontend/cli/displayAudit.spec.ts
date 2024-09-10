import { audit } from '../../middleware/Stacks'
import { Transactions } from '../../shared/types/transactions'
import { convertDate } from '../../shared/normalizers'
import sortTransactions from '../../businessLogic/sortTransactions'

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, coins, stacks}) => ({title, date: convertDate.full(date), coins, stacks}))

it("AUDIT", () => {
  const {
    latestStacks,
    latestStackChanges,
    latestFreeTransactions,
    latestStackedTransactions
  } = audit()
  const transactions = sortTransactions([...latestStackedTransactions, ...latestFreeTransactions], 'stack')

  console.log("NEW STACK CHANGES")
  console.table(latestStackChanges)
  console.log("LATEST STACKS")
  console.table(latestStacks)
  console.log("TRANSACTIONS")
  console.table(normalizeTransactions(transactions))
})
