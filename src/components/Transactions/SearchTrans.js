import * as React from 'react';
import * as R from 'ramda'
import { normalizeText } from '../../shared/normalizers';
import { Input } from "baseui/input";
import { Button } from "baseui/button";

const SearchForResults = transactions => searchWord => 
  transactions.filter(transaction => normalizeText(transaction.title).includes(normalizeText(searchWord)))

const FilterBySearchWord = transactions => R.ifElse(
  R.isEmpty,
  R.always(null),
  SearchForResults(transactions)
)

const SearchTrans = ({props: { transactions, setSearchResults }}) => {
  const [ searchWord, setWord ] = React.useState('');
  const filterBySearchWord = FilterBySearchWord(transactions)

  return (
    <>
      <Input
        value={searchWord}
        onChange={e => setWord(e.target.value)}
        placeholder="Search"
        clearOnEscape
        endEnhancer={() => (
          <Button onClick={() => setSearchResults(filterBySearchWord(searchWord))} >
          search
          </Button>
        )}
      />
    </>
  );
}

export default SearchTrans
