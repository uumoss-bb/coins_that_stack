import { takeLatest, put } from 'redux-saga/effects';
import { initApp, normalizeGroupsAndTrans } from '../actions';
import {
  INIT_APP
} from '../actions/types';

export function* InitApp() {
  try {
    yield put(normalizeGroupsAndTrans())
    yield put(initApp.success())
  } catch(error) {
    console.error(error)
    yield put(initApp.error({error}))
  }
}

export default function* () {
  yield takeLatest([
    INIT_APP
  ], InitApp);
}
