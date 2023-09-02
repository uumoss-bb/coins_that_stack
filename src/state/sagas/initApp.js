import { takeLatest, put } from 'redux-saga/effects';
import { initApp, setGroups, setTransactions } from '../actions';
import {
  INIT_APP
} from '../actions/types';
import LocalStore from '../../storage/LocalStorage/LocalStorage';
import assignGroupsToTrans from '../../shared/assignGroupsToTrans';

export function* InitApp({ payload }) {
  LocalStore.setDefault()
  const { groups, transactions } = LocalStore.getAll()

  yield put(setGroups({ groups }))
  
  const normalizedTrans = assignGroupsToTrans({ groups, transactions })
  yield put(setTransactions({ transactions: normalizedTrans }))

  yield put(initApp.success())
}

export default function* () {
  yield takeLatest([
    INIT_APP
  ], InitApp);
}
