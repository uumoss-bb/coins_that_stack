import * as T from './types'

const createAction = type => Object.assign(
  payload => ({ type, payload }),
  {
    success: payload => ({ type: `${type}_SUCCESS`, payload }),
    error: payload => ({ type: `${type}_ERROR`, payload, error: true })
  }
);

console.log(createAction(T.INIT_APP)())

export const initApp = createAction(T.INIT_APP);
export const setSortDate = createAction(T.SET_SORT_DATE);

