import * as R from 'ramda'

export const normalizeText = R.pipe(
  R.trim,
  R.toLower
)
