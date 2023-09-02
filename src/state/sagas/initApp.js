import { takeLatest, put } from 'redux-saga/effects';
import { initApp, setGroups, setTransactions } from '../actions';
import {
  INIT_APP
} from '../actions/types';
import LocalStore from '../../storage/LocalStorage/LocalStorage';
import assignGroupsToTrans from '../../shared/assignGroupsToTrans';

export function* InitApp({ payload }) {
  try {
    LocalStore.setDefault()
    const { groups, transactions } = LocalStore.getAll()

    yield put(setGroups({ groups, save: false }))
    
    const normalizedTrans = assignGroupsToTrans({ groups, transactions })
    yield put(setTransactions({ transactions: normalizedTrans, save: false }))

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
