import { takeLatest, put } from 'redux-saga/effects';
import { initApp, setGroups, setTransWithNoGroups, setTransactions } from '../actions';
import {
  INIT_APP
} from '../actions/types';
import LocalStore from '../../storage/LocalStorage/LocalStorage';
import assignGroupsToTrans from '../../shared/assignGroupsToTrans';
import { selectTransWithNoGroups } from '../../shared/selectors'
import assignTransToGroups from '../../shared/assignTransToGroups';

export function* InitApp() {
  try {
    LocalStore.setDefault()
    const { groups, transactions } = LocalStore.getAll()

    const normalizedTrans = assignGroupsToTrans({ groups, transactions })
    yield put(setTransactions({ transactions: normalizedTrans, save: false }))

    const transWithNoGroups = selectTransWithNoGroups(normalizedTrans)
    yield put(setTransWithNoGroups({ transWithNoGroups }))

    const groupsWithTrans = assignTransToGroups({ groups, transactions: normalizedTrans })
    yield put(setGroups({ groups: groupsWithTrans, save: false }))

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
