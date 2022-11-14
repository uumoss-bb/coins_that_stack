import normalizeTransactionsBySource from "./normalizeTransactionsBySource";

const filter = ({ transactions, keywords }) => {
  const groupTransactions = []
  const freeTransactions = []

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index]
    const normalizedTransaction = normalizeTransactionsBySource({ transaction })
    const doesTransactionMatch = keywords.filter(keyword => normalizedTransaction.title.includes(keyword)).length
    console.log("ttttt",normalizedTransaction)
    if(doesTransactionMatch) {
      groupTransactions.push(normalizedTransaction)
    } else {
      freeTransactions.push(normalizedTransaction)
    }
  }

  return { groupTransactions, freeTransactions }
}

const collectDataFromTransactions = ({ groupTransactions }) => {
  let coinsSpent = 0

  groupTransactions.forEach(trans => {
    coinsSpent += (trans.transaction * -1)
  })

  return {
    coinsSpent: coinsSpent.toFixed(0)
  }
}

const filterTransactionByGroupKeywords = ({ transactions, groups }) => {
  return Object.values(groups).reduce((res, { name, keywords }) => {
    const { groupTransactions, freeTransactions } = filter({ transactions: res.freeTransactions, keywords })
    const { coinsSpent } = collectDataFromTransactions({ groupTransactions })
    return {
      groupsWithTransactions: {
        ...res.groupsWithTransactions,
        [name]: {
          name,
          keywords,
          transactions: groupTransactions,
          coinsSpent
        },
      },
      freeTransactions
    }
  },{ freeTransactions: transactions })
}

export default filterTransactionByGroupKeywords