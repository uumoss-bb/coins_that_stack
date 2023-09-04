import * as T from '../actions/types'

const noop = () => { };

const initialState = {
  sortDate: [],
  groups: [],
  transactions: [],
  transWithNoGroups: [],
  files: []
}

const reducer = (state, { type, payload, error }) => ({  //eslint-disable-line
  [T.SET_GROUPS]: () => ({...state, ...payload}),
  [T.SET_TRANSACTIONS]: () => ({...state, ...payload}),
  [T.SET_SORT_DATE]: () => ({...state, ...payload}),
  [T.SET_TRANS_WITHOUT_GROUPS]: () => ({...state, ...payload})
}[type] || noop)() || state;

export default (state = initialState, action) => reducer(state, action)
