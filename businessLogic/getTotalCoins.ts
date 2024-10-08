import { Transactions } from "../shared/types/transactions"

export type Total = { transactions: Transactions, total: number }
export type TotalResult = { deposit: Total, withdraw: Total }

const defaultTotal: TotalResult = {
  deposit: { transactions: [], total: 0 },
  withdraw: { transactions: [], total: 0 }
}

const getTotalCoins = (transactions: Transactions) =>
  transactions.reduce((res, transaction) => {
    res[transaction.type].total += transaction.coins
    res[transaction.type].transactions.push({ ...transaction })
    return res
  }, defaultTotal)

export default getTotalCoins
