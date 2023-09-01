import { takeLatest, put } from 'redux-saga/effects';
import { initApp } from '../actions';
import {
  INIT_APP
} from '../actions/types';

export function* InitApp({ payload }) {
  console.log('HELO WORLD')
}

export default function* () {
  yield takeLatest([
    INIT_APP
  ], InitApp);
}
