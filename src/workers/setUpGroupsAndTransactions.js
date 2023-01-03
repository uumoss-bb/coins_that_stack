import normalizeText from "./normalizeText";
import {
  capitalone,
  elevations,
  venmo,
  paypal
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


const attachTransactionsToGroups = ({ transaction, groups }) => {
  let belongsToGroup = false
  const groupsWithTransactions = groups

  Object.values(groups).forEach(group => {
    const normalizedTitle = normalizeText(transaction.title)
    const normalizedCategory = transaction.category ? normalizeText(transaction.category) : 'no category'
    const filterCondition = keyword => normalizedTitle.includes(normalizeText(keyword)) || normalizedCategory.includes(normalizeText(keyword))
    
    const doesTransactionMatch = group.keywords.filter(keyword => filterCondition(keyword)).length
    if(doesTransactionMatch) {
      belongsToGroup = true

      group.transactions = [
        ...group.transactions,
        transaction
      ]
      
      group.coinsSpent += Number(transaction.transaction)

      groupsWithTransactions[group.name] = group
    }

  })

  return { groupsWithTransactions, belongsToGroup }
}

const allTransactions = [ ...elevations, ...capitalone, ...venmo, ...paypal ]

const calculateMoney = (transactions) => 
  transactions.reduce((res, transaction) => {
    if(transaction.type === "IN") {
      res.IN.total += transaction.transaction
      res.IN.transactions.push(transaction)
    } else {
      res.OUT.total += transaction.transaction
      res.OUT.transactions.push(transaction)
    }

    return res
  }, {IN: {transactions: [], total: 0}, OUT: {transactions: [], total: 0}})

const setUpGroupsAndTransactions = ({ date = [new Date()] }) => {
  const defaultResult = { normalizedGroups: getGroupsFromStorage(), freeTransactions: [] }

  const money = calculateMoney(allTransactions)
  // console.log(money)

  return allTransactions.reduce((res, transaction) => {
    const transDate = dateToMiliSeconds({ date: transaction.date })
    const filterStartDate = dateToMiliSeconds({ date: date[0] })
    const filterEndDate = dateToMiliSeconds({ date: date[1] })

    const newRes = {
      normalizedGroups: res.normalizedGroups,
      freeTransactions: res.freeTransactions
    }

    if( (date.length === 1) || (transDate >= filterStartDate && transDate <= filterEndDate) ) {
      
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