import getTotalCoins, { TotalResult } from "../../businessLogic/getTotalCoins"
import { selectTruthyItems } from '../../shared/selectors';
import { Transaction, Transactions } from "../../shared/types/transactions";
import { StackClass } from ".";

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

const summarizeTotal = function(this: StackClass) {
  const result = getTotalCoins(this.transactions)
  return {
    grandTotal: totalToTable(result),
    deposits: transToTable(result.deposit.transactions),
    withdraws: transToTable(result.withdraw.transactions)
  }
}

export default summarizeTotal
