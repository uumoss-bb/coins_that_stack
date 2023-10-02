import { takeLatest, put } from 'redux-saga/effects';
import { 
  setGroups,
  setTransWithNoGroups,
  setTransactions
} from '../actions';
import {
  NORMALIZE_GROUPS_TRANS
} from '../actions/types';
import LocalStore from '../../storage/LocalStorage/LocalStorage';
import assignGroupsToTrans from '../../shared/assignGroupsToTrans';
import { selectTransWithNoGroups } from '../../shared/selectors'
import assignTransToGroups from '../../shared/assignTransToGroups';

export function* NormalizeGroupsAndTrans() {
  LocalStore.setDefault()
  const { groups, transactions } = LocalStore.getAll()

  const normalizedTrans = assignGroupsToTrans({ groups, transactions })
  yield put(setTransactions({ transactions: normalizedTrans, save: false }))

  const transWithNoGroups = selectTransWithNoGroups(normalizedTrans)
  yield put(setTransWithNoGroups({ transWithNoGroups }))

  const groupsWithTrans = assignTransToGroups({ groups, transactions: normalizedTrans })
  yield put(setGroups({ groups: groupsWithTrans, save: false }))
}

export default function* () {
  yield takeLatest([
    NORMALIZE_GROUPS_TRANS
  ], NormalizeGroupsAndTrans);
}
