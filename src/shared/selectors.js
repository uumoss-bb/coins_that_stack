import * as R from 'ramda'

export const selectTransWithNoGroups = R.filter(
  trans => trans.groups.length === 0
)
