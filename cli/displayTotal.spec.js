import getTotalCoins from "../businessLogic/getTotalCoins"
import coin from '../transactions'
import normalizeTransactions from "../businessLogic/normalizeTransactions"
import { selectTruthyItems } from '../shared/selectors';

const transToTable = (trans) => {

  function Transaction(data) {
    this.date = data.date;
    this.title = data.title;
    this[data.type] = data.transaction;
  }

  return trans.map((tran) => new Transaction(tran)).filter(selectTruthyItems)
}


const totalToTable = (data) => {
  function Total(data) {
    this.total = data.total
  }

  return {
    deposits: new Total(data.deposit),
    withdraws: new Total(data.withdraw),
    total: new Total({ total: data.deposit.total + data.withdraw.total })
  }
}


it("GET TOTAL", () => {
  const _transactions = normalizeTransactions({source: "FORT_FINANCIAL", transactions: coin})
  const result = getTotalCoins(_transactions)
  console.table(totalToTable(result))
  console.table(transToTable(result.deposit.transactions))
  console.table(transToTable(result.withdraw.transactions))
})
