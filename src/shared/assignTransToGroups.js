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

const AttachTrans = ({ transactions, date }) => (res, group) => {
  //WIP: handle date change
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

const assignTransToGroups = ({ date = [], groups, transactions }) => R.pipe(
  Object.values,
  R.reduce( AttachTrans({ transactions, date }), {} )
)(groups)

export default assignTransToGroups
