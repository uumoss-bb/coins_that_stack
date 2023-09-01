import * as T from './types'

const createAction = type => Object.assign(
  payload => ({ type, payload }),
  {
    success: payload => ({ type: `${type}_SUCCESS`, payload }),
    error: payload => ({ type: `${type}_ERROR`, payload, error: true })
  }
);

export const initApp = createAction(T.INIT_APP);
