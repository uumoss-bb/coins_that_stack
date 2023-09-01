import * as T from '../actions/types'

const noop = () => { };

const initialState = {
  groups: [],
  transactions: [],
  files: []
}

const reducer = (state, { type, payload, error }) => ({  //eslint-disable-line
  [T.INIT_APP_SUCCESS]: () => {console.log("APP Init")}
}[type] || noop)() || state;

export default (state = initialState, action) => reducer(state, action)
