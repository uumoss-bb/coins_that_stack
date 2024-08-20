import linkGroupsAndTrans, { ConnectedGroupsAndTrans } from '../../businessLogic/linkGroupsAndTrans'
import normalizeTransactions from "../../businessLogic/normalizeTransactions"
import coin from '../../transactions'
import defaultGroups from '../../shared/defaultGroups'
import { selectTruthyItems } from '../../shared/selectors';
import { Transaction, Transactions } from '../../shared/types/transactions';
import { Group } from '../../shared/types/groups';

const GroupItem = (group: Group) =>  ({
  keywords: group.keywords.join('||'),
  count: group.transactions.length,
  coins: group.coins
})

const TransactionWithGroupItem = (transaction: Transaction) => ({
  title: transaction.title,
  groups: transaction.groups,
  date: transaction.date,
  [transaction.type]: transaction.transaction
})

const collectNonGroupedTransactionsInGroup = (transactions: Transactions) => {
  let coins = 0
  let nonGroupTransactions: Transactions = []
  transactions.forEach(transaction => {
    if(!transaction.groups.length) {
      coins += transaction.transaction
      transactions.push(transaction)
    }
  })

  return { 'Non-Grouped': GroupItem({ coins, transactions: nonGroupTransactions, name: "Non-Grouped", keywords: [ "non" ] })}
}

const normalizeGroupsForTable = (linkedData: ConnectedGroupsAndTrans) => {
  const arrayOfGroups = Object.values(linkedData.groups)

  const actualGroups = arrayOfGroups.reduce((prevValue, group) => {
    return {
      ...prevValue,
      [group.name]: GroupItem(group)
    }
  },{})

  const nonGroupedTransactions = collectNonGroupedTransactionsInGroup(linkedData.transactions)

  return {
    ...actualGroups,
    ...nonGroupedTransactions
  }
}

const normalizeGroupedTransactionsForTable = (linkedData: ConnectedGroupsAndTrans) => {
  const arrayOfGroups = Object.values(linkedData.groups)
  const transactionsForTable: Object[] = []

  arrayOfGroups.forEach((group) => {
    transactionsForTable.push(group.transactions.map((transaction) => TransactionWithGroupItem(transaction)))
  })

  return transactionsForTable.flat()
}

const normalizeNonGroupedTransactionsForTable = ({ transactions }: ConnectedGroupsAndTrans) =>
  transactions.map((transaction) => {
    if(!transaction.groups.length) {
      return TransactionWithGroupItem(transaction)
    }
    return null
  }).filter(selectTruthyItems)

const getGroups = () => {
  const transactions = normalizeTransactions({source: "FORT_FINANCIAL", transactions: coin})
  const linkedData = linkGroupsAndTrans(defaultGroups, transactions)
  return {
    groupsForTable: normalizeGroupsForTable(linkedData),
    groupedTransactionsForTable: normalizeGroupedTransactionsForTable(linkedData),
    nonGroupedTransactionsForTable: normalizeNonGroupedTransactionsForTable(linkedData)
  }
}

export default getGroups
