import { takeLatest, put } from 'redux-saga/effects';
import { initApp } from '../../actions';
import {
  INIT_APP_SUCCESS
} from '../../actions/types';
import { selectErrorObject } from 'shared/formatError';

export function* InitApp({ payload }) {
  yield put(initApp)
}

export default function* () {
  yield takeLatest([
    INIT_APP_SUCCESS
  ], InitApp);
}
