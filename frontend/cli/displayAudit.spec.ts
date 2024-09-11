import { audit } from '../../middleware/Stacks'
import { Transactions } from '../../shared/types/transactions'
import { convertDate, formatToCurrency } from '../../shared/normalizers'
import sortTransactions from '../../businessLogic/sortTransactions'
import { StackPayments } from '../../shared/types/stacks'
import { getIncomeFile } from '../../middleware/Income'

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, coins, stacks}) => ({title, date: convertDate.full(date), coins: formatToCurrency(coins), stacks}))

const normalizePayDayExpenses = (income: number, stackPayments: StackPayments) => {
  const totalPayments = Object.values(stackPayments).reduce((prevValue, payment) => prevValue + payment, 0)
  return {
    totalIncome: formatToCurrency(income),
    payDayExpenses: formatToCurrency(totalPayments),
    remaining: formatToCurrency(income - totalPayments)
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

  console.log("PAYDAY EXPENSES", normalizePayDayExpenses(coins, stackPayments))
  console.table(fatStacks)
})
