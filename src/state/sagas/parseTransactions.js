import { takeLatest, put } from 'redux-saga/effects';
import { 
  normalizeGroupsAndTrans,
  setTransactions
} from '../actions';
import {
  PARSE_TRANSACTIONS
} from '../actions/types';
import { parse } from 'csv-parse';

export function* ParseTransactions({ payload: { file, source } }) {
  console.log({file, source})
  const reader = new FileReader();

  reader.onload = (event) => {
    const csvText = event.target.result;
    const parseCsv = parse({columns: true}).on('error', (err) => {console.error(err)});
    parseCsv(csvText);
  };

  yield reader.readAsText(file);
  yield normalizeGroupsAndTrans()
}

export default function* () {
  yield takeLatest([
    PARSE_TRANSACTIONS
  ], );
}
