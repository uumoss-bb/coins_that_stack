import { fork, all } from 'redux-saga/effects';
import initApp from './initApp';
import insert from './insertData';


const sagas = [
  initApp,
  insert
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)));
}
