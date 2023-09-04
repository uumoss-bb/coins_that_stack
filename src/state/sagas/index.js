import { fork, all } from 'redux-saga/effects';
import initApp from './initApp';
import insert from './insertData';
import normalizeGroupsAndTrans from './normalizeGroupsAndTrans';

const sagas = [
  initApp,
  insert,
  normalizeGroupsAndTrans
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)));
}
