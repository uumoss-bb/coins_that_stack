import { audit } from '../../middleware/Stacks'
import { Transactions } from '../../shared/types/transactions'
import { convertDate } from '../../shared/normalizers'
import sortTransactions from '../../businessLogic/sortTransactions'
import { StackPayments } from '../../shared/types/stacks'
import { getIncomeFile } from '../../middleware/Income'

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, coins, stacks}) => ({title, date: convertDate.full(date), coins, stacks}))

const normalizePayDayExpenses = (income: number, stackPayments: StackPayments) => {
  const totalPayments = Object.values(stackPayments).reduce((prevValue, payment) => prevValue + payment, 0)
  return {
    totalIncome: income,
    payDayExpenses: totalPayments,
    remaining: income - totalPayments
  }
}


it("AUDIT", () => {
  const { coins } = getIncomeFile()
  const {
    latestStacks,
    latestStackChanges,
    latestFreeTransactions,
    latestStackedTransactions,
    fatStacks,
    stackPayments
  } = audit()
  const transactions = sortTransactions([...latestStackedTransactions, ...latestFreeTransactions], 'stack')

  console.log("NEW STACK CHANGES")
  console.table(latestStackChanges)

  console.log("TRANSACTIONS")
  console.table(normalizeTransactions(transactions))

  console.log("FAT STACKS")
  console.table(fatStacks)

  console.log("PAYDAY EXPENSES")
  console.table(normalizePayDayExpenses(coins, stackPayments))
})
