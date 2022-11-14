const normalizeElevationsData = ({ Memo, Date, Amount_Debit }) => ({
  source: 'elevations',
  title: Memo,
  transaction: Amount_Debit,
  date: Date
})

const normalizeCapitalOneData = ({ Description, Transaction_Date, Debit }) => ({
  source: 'capitalOne',
  title: Description,
  transaction: Debit * -1,
  date: Transaction_Date
})

const sourceFunctions = {
  elevations: normalizeElevationsData,
  capitalOne: normalizeCapitalOneData
}

const normalizeTransactionsBysource = ({ transaction }) => transaction?.source ? sourceFunctions[transaction.source](transaction) 
  : { source: 'Null', title: 'Null', transaction: 0, date: 'Null' }

export default normalizeTransactionsBysource