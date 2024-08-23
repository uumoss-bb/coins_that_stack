import getTotalCoins, { Total, TotalResult } from "../businessLogic/getTotalCoins"
import coin from '../transactions'
import normalizeTransactions from "../businessLogic/normalizeTransactions"
import { selectTruthyItems } from '../shared/selectors';
import { Transaction, Transactions } from "../shared/types/transactions";

const transToTable = (transactions: Transactions) => {

  const TransactionItem = (transaction: Transaction) => ({
    date: transaction.date,
    title: transaction.title,
    [transaction.type]: transaction.transaction
  })

  return transactions.map((transaction) => TransactionItem(transaction)).filter(selectTruthyItems)
}


const totalToTable = (data: TotalResult) => {
  const Total = (data: { total: number }) => ({
    total: data.total
  })

  return {
    deposits: Total(data.deposit),
    withdraws: Total(data.withdraw),
    total: Total({ total: data.deposit.total + data.withdraw.total })
  }
}

const summarizeTotal = () => {
  const _transactions = normalizeTransactions({source: "FORT_FINANCIAL", transactions: coin})
  const result = getTotalCoins(_transactions)
  console.table(totalToTable(result))
  console.table(transToTable(result.deposit.transactions))
  console.table(transToTable(result.withdraw.transactions))
  return {
    grandTotal: totalToTable(result),
    deposits: transToTable(result.deposit.transactions),
    withdraws: transToTable(result.withdraw.transactions)
  }
}

export default summarizeTotal
