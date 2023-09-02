import { takeLatest, put } from 'redux-saga/effects';
import { setGroups, setTransactions } from '../actions';
import {
  SET_GROUPS,
  SET_TRANSACTIONS
} from '../actions/types';
import LocalStore from '../../storage/LocalStorage/LocalStorage';

const saveData = ({save = true, key, data}) => {
  if(save) {
    LocalStore.post(key, data)
  }
}

export function* InsertGroups({ payload: { groups, save } }) {
  try {
    saveData({save, key: 'groups', data: groups})
    yield put(setGroups.success())
  } catch(error) {
    console.error(error)
    yield put(setGroups.error({error}))
  }
}

export function* InsertTransations({ payload: { transactions, save } }) {
  try {
    saveData({save, key: 'groups', data: transactions})
    yield put(setTransactions.success())
  } catch(error) {
    console.error(error)
    yield put(setTransactions.error({error}))
  }
}

export default function* () {
  yield takeLatest([
    SET_GROUPS,
  ], InsertGroups);

  yield takeLatest([
    SET_TRANSACTIONS,
  ], InsertTransations);
}
