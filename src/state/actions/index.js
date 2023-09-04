import * as T from './types'

const createAction = type => Object.assign(
  payload => ({ type, payload }),
  {
    success: payload => ({ type: `${type}_SUCCESS`, payload }),
    error: payload => ({ type: `${type}_ERROR`, payload, error: true })
  }
);

export const initApp = createAction(T.INIT_APP);

export const setSortDate = createAction(T.SET_SORT_DATE);
export const setGroups = createAction(T.SET_GROUPS);
export const setTransactions = createAction(T.SET_TRANSACTIONS);
export const setTransWithNoGroups = createAction(T.SET_TRANS_WITHOUT_GROUPS);
