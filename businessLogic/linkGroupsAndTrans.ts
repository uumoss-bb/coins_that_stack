import { selectTruthyItems } from "../shared/selectors"
import { Groups, GroupsArray } from "../shared/types/groups"
import { Transaction, Transactions } from "../shared/types/transactions"

export interface ConnectedGroupsAndTrans {
  transactions: Transactions,
  groups: Groups
}

const findGroupsForTrans = (transaction: Transaction, groups: GroupsArray) => {
  const transGroups = groups.map((group) => {
    const keywordMatch = group.keywords.filter((keyword) => transaction.title.includes(keyword))
    if(keywordMatch.length) {
      return group.name
    }
    return null
  })
  return transGroups.filter(selectTruthyItems).flat() as string[]
}

const updateGroupsWithTrans = (transaction: Transaction, _groups: Groups, transactionGroups: string[]) => {
  let groups: Groups = { ..._groups }
  transactionGroups.forEach(groupName => {
    const group = groups[groupName]
    if(group) {
      group.transactions.push(transaction)
      group.coins += transaction.transaction
    }
  })
  return groups
}

const linkGroupsAndTrans = (groups: Groups, transactions: Transactions) => {
  const groupsArray: GroupsArray = Object.values(groups)
  const defaultResult: ConnectedGroupsAndTrans = { transactions: [], groups }

  return transactions.reduce((previousValue, transaction) => {
    const transactionGroups = findGroupsForTrans(transaction, groupsArray)
    const updatedTransaction = { ...transaction, groups: transactionGroups }
    const updatedGroups = updateGroupsWithTrans(updatedTransaction, groups, transactionGroups)
    return {
      transactions: [
        ...previousValue.transactions,
        updatedTransaction
      ],
      groups: updatedGroups
    }
  }, defaultResult)
}

export default linkGroupsAndTrans
