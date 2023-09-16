import * as R from 'ramda'

const attach = ({group, trans}) => {
  const { transactions, coinsSpent } = group
  const newSpentCoins = Number(coinsSpent) + Number(trans.transaction)
  return {
    ...group,
    transactions: [
      ...transactions,
      trans
    ],
    coinsSpent: newSpentCoins.toFixed(0)
  }
}

const setDefault = (group) => ({
  ...group,
  transactions: [],
  coinsSpent: 0
})

const AttachTrans = (transactions) => (res, _group) => {
  let group = setDefault(_group)
  transactions.forEach(trans => {
    const doesTransMatch = trans.groups.includes(group.name)
    if(doesTransMatch) {
      group = attach({group, trans})
    }
  })

  return {
    ...res,
    [group.name]: group
  }
}

const assignTransToGroups = ({ groups, transactions }) => R.pipe(
  Object.values,
  R.reduce( AttachTrans(transactions), {} )
)(groups)

export default assignTransToGroups
