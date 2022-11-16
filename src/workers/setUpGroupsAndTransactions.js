import normalizeText from "./normalizeText";
import normalizeTransactionsBySource from "./normalizeTransactionsBySource";
import {
  capitalOne,
  elevations
} from '../transactions'
import Storage from "./Storage";

const setGroupsToDefault = ({ group }) => ({ ...group, transactions: [], coinsSpent: 0 })

const getGroupsFromStorage = () => {
  const storedGroups = Storage.getAll()
  
  return storedGroups.reduce((groups, group) => ({
    ...groups,
    [group.name] : setGroupsToDefault({ group })
  }), {})
}

const dateToMiliSeconds = ({date}) => new Date(date).getTime()

const dateToDateString= ({date}) => new Date(date).toDateString()

const attachTransactionsToGroups = ({ transaction, groups }) => {
  let belongsToGroup = false
  const groupsWithTransactions = groups

  Object.values(groups).forEach(group => {
    const normalizedTitle = normalizeText(transaction.title)
    const doesTransactionMatch = group.keywords.filter(keyword => normalizedTitle.includes(normalizeText(keyword))).length
    if(doesTransactionMatch) {
      belongsToGroup = true

      group.transactions = [
        ...group.transactions,
        transaction
      ]
      
      group.coinsSpent += Number(transaction.transaction * -1)

      groupsWithTransactions[group.name] = group
    }

  })

  return { groupsWithTransactions, belongsToGroup }
}

const allTransactions = [ ...elevations, ...capitalOne ]

const setUpGroupsAndTransactions = ({ date = [new Date()] }) => {
  const defaultResult = { normalizedGroups: getGroupsFromStorage(), freeTransactions: [] }

  return allTransactions.reduce((res, transaction) => {
    transaction = normalizeTransactionsBySource({ transaction })
    const filterDate = dateToMiliSeconds({ date })
    const transDate = dateToMiliSeconds({ date: transaction.date })
    const filterDateString = dateToDateString({ date })
    const nowDateString = dateToDateString({ date: Date.now() })

    const newRes = {
      normalizedGroups: res.normalizedGroups,
      freeTransactions: res.freeTransactions
    }

    if( nowDateString === filterDateString || transDate >= filterDate ) {
      
      const { groupsWithTransactions, belongsToGroup } = attachTransactionsToGroups({ transaction, groups: res.normalizedGroups })
      
      newRes.normalizedGroups = groupsWithTransactions

      if(!belongsToGroup) {
        newRes.freeTransactions.push(transaction)
      }
    }

    return newRes
  }, defaultResult)
}

export default setUpGroupsAndTransactions