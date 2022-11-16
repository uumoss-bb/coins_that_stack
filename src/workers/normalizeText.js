import * as R from 'ramda'

const normalizeText = R.pipe(
  R.trim,
  R.toLower
)

export default normalizeText