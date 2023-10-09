import * as R from 'ramda'

const getTransactionType = (amount) => amount > 0 ? 'IN' : 'OUT'

const normalizeElevations = ({ Description, Posting_Date, Amount, Transaction_Category, Type }) => {
  if(Posting_Date && !Description.includes('CAPITAL ONE TYPE: ONLINE PMT')) {
    return {
      source: 'elevations',
      title: Description,
      transaction: Amount,
      date: Posting_Date,
      type: Type === "Transfer" ? "Transfer" : getTransactionType(Amount),
      category: Transaction_Category
    }
  }
}

const normalizeCapitalOne = ({ Description, Transaction_Date, Debit, Credit, Category }) => {
  if(Transaction_Date && !Description.includes('PYMT')) {
    return {
      source: 'capitalOne',
      title: Description,
      transaction: Debit * -1,
      date: Transaction_Date,
      type: 'OUT',
      category: Category
    }
  }
}

const normalizerFunctions = {
  elevations: normalizeElevations,
  capitalone: normalizeCapitalOne,
}

const normalizeTransactions = ({ source, transactions }) => R.pipe(
  R.map((transaction) => normalizerFunctions[source](transaction)),
  R.reject(R.isNil),
)(transactions)

export default normalizeTransactions
