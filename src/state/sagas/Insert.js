import { takeLatest, put } from 'redux-saga/effects';
import { setGroups, setTransactions } from '../actions';
import {
  SET_GROUPS,
  SET_TRANSACTIONS
} from '../actions/types';

export function* InsertGroups({ payload }) {
  console.log(payload)

  yield put(setGroups.success())
}

export function* InsertTransations({ payload }) {
  console.log(payload)

  yield put(setTransactions.success())
}

export default function* () {
  yield takeLatest([
    SET_GROUPS,
  ], InsertGroups);

  yield takeLatest([
    SET_TRANSACTIONS,
  ], InsertTransations);
}
