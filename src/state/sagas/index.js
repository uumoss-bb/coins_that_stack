import { fork, all } from 'redux-saga/effects';
import initApp from './workers/initApp';

const sagas = [
  initApp
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)));
}
