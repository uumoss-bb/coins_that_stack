import * as T from './types'

const noop = () => { };

const initialState = {}

const reducer = (state, { type, payload, error }) => ({  //eslint-disable-line
  [T.INIT_APP_SUCCESS]: () => {console.log("APP Init")}
}[type] || noop)() || state;

export default (state = initialState, action) => reducer(state, action)
