import normalizeTransactionsBySource from "./normalizeTransactionsBySource";

const dateToMiliSeconds = ({date}) => new Date(date).getTime()

const dateToDateString= ({date}) => new Date(date).toDateString()

const filter = ({ transactions, keywords, date }) => {
  const groupTransactions = []
  const freeTransactions = []

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index]
    const normalizedTransaction = normalizeTransactionsBySource({ transaction })
    const filterDate = dateToMiliSeconds({ date })
    const transDate = dateToMiliSeconds({ date: normalizedTransaction.date })
    const filterDateString = dateToDateString({ date })
    const nowDateString = dateToDateString({ date: Date.now() })

    if( nowDateString === filterDateString || transDate >= filterDate ) {
      const doesTransactionMatch = keywords.filter(keyword => normalizedTransaction.title.includes(keyword)).length
      if(doesTransactionMatch) {
        groupTransactions.push(normalizedTransaction)
      } else {
        freeTransactions.push(normalizedTransaction)
      }
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

const setUpGroupsAndTransactions = ({ transactions, groups, date }) => {
  return Object.values(groups).reduce((res, { name, keywords }) => {
    const { groupTransactions, freeTransactions } = filter({ transactions: res.freeTransactions, keywords, date })
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

export default setUpGroupsAndTransactions