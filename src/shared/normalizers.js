import * as R from 'ramda'

export const normalizeText = R.ifElse(
  R.isNil,
  R.always("Missing Title"),
  R.pipe(
    R.trim,
    R.toLower
  )
)

export const replaceSpacesWithUnderscores = R.replace(/\s+/g, '_');
