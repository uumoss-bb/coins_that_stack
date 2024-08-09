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

const organizeTables = (groups, type) => {

  function Transaction(data) {
    this.title = data.title;
    this.groups = data.groups;
    this.date = data.date;
    this[data.type] = data.transaction;
  }

  const transactions = []

  return {
    groups: groups.reduce((prevValue, group) => {
      transactions.push(group.transactions.map((trans) => new Transaction(trans)))
        return {
          ...prevValue,
          [group.name]: new Group(group)
        }
    },{}),
    transactions: transactions.flat()
  }
}

const transToTable = (trans) => {

  function Transaction(data) {
    this.date = data.date;
    this.title = data.title;
    this[data.type] = data.transaction;
  }

  return trans.map((tran) => {
    if(!tran.groups.length) {
      return new Transaction(tran)
    }
    return null
  }).filter(selectTruthyItems)
}

const calculateNonGroupedTrans = (trans) => {
  let totalCoin = 0
  let transactions = []
  trans.forEach(tran => {
    if(!tran.groups.length) {
      totalCoin += tran.transaction
      transactions.push(tran)
    }
  })

  return { 'Non-Grouped': new Group({ coins: totalCoin, transactions, name: "Non-Grouped", keywords: [ "non" ] })}
}


it("GET GROUPS", () => {
  const transactions = normalizeTransactions({source: "FORT_FINANCIAL", transactions: coin})
  const result = linkGroupsAndTrans(defaultGroups, transactions)
  const { groups, transactions: groupTrans } = organizeTables(Object.values(result.groups))
  console.table({...groups, ...calculateNonGroupedTrans(result.transactions)})
  console.table(groupTrans)
  console.table(transToTable(result.transactions))
})
