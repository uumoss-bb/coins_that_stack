
const getTransactionType = (amount) => amount > 0 ? 'IN' : 'OUT'

const normalizeElevations = ({ Description, Posting_Date, Amount, Transaction_Category, Type }) => {
  return {
    source: 'elevations',
    title: Description,
    transaction: Amount,
    date: Posting_Date,
    type: Type === "Transfer" ? "Transfer" : getTransactionType(Amount),
    category: Transaction_Category
  }
}

const normalizeCapitalOne = ({ Description, Transaction_Date, Debit, Credit, Category }) => {
  if(!Description.includes('PYMT')) {
    return {
      source: 'capitalOne',
      title: Description,
      transaction: Debit ? Debit : Credit,
      date: Transaction_Date,
      type: getTransactionType(Debit | Credit),
      category: Category
    }
  }
}

const normalizerFunctions = {
  elevations: normalizeElevations,
  capitalone: normalizeCapitalOne,
}

function normalizeTransactions({ source, transactions }) {
  let newTransactions = []

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index];
    const normalizedTransaction = normalizerFunctions[source](transaction)
    newTransactions.push(normalizedTransaction)
  }

  return newTransactions
}

export default normalizeTransactions
