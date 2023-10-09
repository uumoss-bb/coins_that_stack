import * as R from 'ramda'
import { normalizeText } from "./normalizers";

const doesTransactionMatch = ({ transaction, group }) => {
  console.log(transaction)
  const normalizedTitle = normalizeText(transaction.title)
  const normalizedCategory = transaction.category ? normalizeText(transaction.category) : 'no category'
  
  const titleMatch = group.keywords.filter(keyword => normalizedTitle.includes(normalizeText(keyword))).length
  const categoryMatch = group.keywords.filter(keyword => normalizedCategory.includes(normalizeText(keyword))).length

  return !!(titleMatch || categoryMatch)
}

const filterMatchs = ({trans, groups}) => R.pipe(
  R.map(group => doesTransactionMatch({ transaction: trans, group }) ? group.name : null),
  R.reject(R.isNil)
)(groups)

const assignGroupsToTrans = ({ date = [], transactions, groups: _groups }) => transactions.map(trans => {
  const groups = Object.values(_groups)
  const matchingGroups = filterMatchs({ trans, groups })
  return {
    ...trans,
    groups: matchingGroups
  }
})

export default assignGroupsToTrans
