import normalizeTransactionsBySource from "./normalizeTransactionsBySource";

const dateToMiliSeconds = ({date}) => new Date(date).getTime()

const dateToDateString= ({date}) => new Date(date).toDateString()

const attachTransactionsToGroups = ({ transaction, groups }) => {
  let belongsToGroup = false
  const groupsWithTransactions = groups

  Object.values(groups).forEach(group => {
    const doesTransactionMatch = group.keywords.filter(keyword => transaction.title.includes(keyword)).length
    if(doesTransactionMatch) {
      belongsToGroup = true

      group.transactions = [
        ...group.transactions,
        transaction
      ]
      
      group.coinsSpent += Number(transaction.transaction * -1)
      console.log(group.coinsSpent)
      // group.coinsSpent = group.coinsSpent.toFixed(1)

      groupsWithTransactions[group.name] = group
    }

  })

  return { groupsWithTransactions, belongsToGroup }
}

const setGroupsToDefault = ({ groups }) => {

  Object.values(groups).forEach(group => {
    group.transactions = []
    group.coinsSpent = 0

    groups[group.name] = group
  })

  return groups
}

const setUpGroupsAndTransactions = ({ transactions, groups, date }) => {
  const defaultResult = { groupsWithTransactions: setGroupsToDefault({ groups }), freeTransactions: [] }

  return transactions.reduce((res, transaction) => {
    const normalizedTransaction = normalizeTransactionsBySource({ transaction })
    const filterDate = dateToMiliSeconds({ date })
    const transDate = dateToMiliSeconds({ date: normalizedTransaction.date })
    const filterDateString = dateToDateString({ date })
    const nowDateString = dateToDateString({ date: Date.now() })

    if( nowDateString === filterDateString || transDate >= filterDate ) {
      
      const { groupsWithTransactions, belongsToGroup } = attachTransactionsToGroups({ transaction: normalizedTransaction, groups })
      return {
        groupsWithTransactions,
        freeTransactions: [
          ...res.freeTransactions,
          !belongsToGroup && normalizedTransaction
        ]
      }
    }

    return {
      groupsWithTransactions: res.groupsWithTransactions,
      freeTransactions: res.freeTransactions
    }
  }, defaultResult)
}

export default setUpGroupsAndTransactions