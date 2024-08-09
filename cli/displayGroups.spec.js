import linkGroupsAndTrans from '../businessLogic/linkGroupsAndTrans'
import normalizeTransactions from "../businessLogic/normalizeTransactions"
import coin from '../transactions'
import defaultGroups from '../shared/defaultGroups'
import { selectTruthyItems } from '../shared/selectors';

function Group(data) {
  this.keywords = data.keywords.join('||');
  this.count = data.transactions.length;
  this.coins = data.coins;
}

function TransactionWithGroup(data) {
  this.title = data.title;
  this.groups = data.groups;
  this.date = data.date;
  this[data.type] = data.transaction;
}

const collectNonGroupedTransactionsInGroup = (transactions) => {
  let coins = 0
  let nonGroupTransactions = []
  transactions.forEach(transaction => {
    if(!transaction.groups.length) {
      coins += transaction.transaction
      transactions.push(transaction)
    }
  })

  return { 'Non-Grouped': new Group({ coins, transactions: nonGroupTransactions, name: "Non-Grouped", keywords: [ "non" ] })}
}

const normalizeGroupsForTable = (linkedData) => {
  const arrayOfGroups = Object.values(linkedData.groups)

  const actualGroups = arrayOfGroups.reduce((prevValue, group) => {
    return {
      ...prevValue,
      [group.name]: new Group(group)
    }
  },{})

  const nonGroupedTransactions = collectNonGroupedTransactionsInGroup(linkedData.transactions)

  return {
    ...actualGroups,
    ...nonGroupedTransactions
  }
}

const normalizeGroupedTransactionsForTable = (linkedData) => {
  const arrayOfGroups = Object.values(linkedData.groups)
  const transactionsForTable = []

  arrayOfGroups.forEach((group) => {
    transactionsForTable.push(group.transactions.map((transaction) => new TransactionWithGroup(transaction)))
  })

  return transactionsForTable.flat()
}

const normalizeNonGroupedTransactions = ({ transactions }) => transactions.map((transaction) => {
  if(!transaction.groups.length) {
    return new TransactionWithGroup(transaction)
  }
  return null
}).filter(selectTruthyItems)


it("GET GROUPS", () => {
  const transactions = normalizeTransactions({source: "FORT_FINANCIAL", transactions: coin})
  const linkedData = linkGroupsAndTrans(defaultGroups, transactions)
  console.table(normalizeGroupsForTable(linkedData))
  console.table(normalizeGroupedTransactionsForTable(linkedData))
  console.table(normalizeNonGroupedTransactions(linkedData))
})
