import * as React from 'react';
import './index.css';
import Groups from '../../components/Groups';
import Transactions from '../../components/Transactions'
import setUpGroupsAndTransactions from '../../workers/setUpGroupsAndTransactions';
import DateInput from '../../components/DateInput';
import normalizeText from '../../workers/normalizeText';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Input } from "baseui/input";
import { Button } from "baseui/button";

const FilterBySearchWord = ({ transactions }) => ({ searchWord }) => transactions.filter(transaction => normalizeText(transaction.title).includes(normalizeText(searchWord)))

const SearchTransactions = ({props: { transactions, setTransactions }}) => {
  const [ searchWord, setWord ] = React.useState('');
  const filterBySearchWord = FilterBySearchWord({ transactions })

  return (
    <>
      <Input
        value={searchWord}
        onChange={e => setWord(e.target.value)}
        placeholder="Search"
        clearOnEscape
        endEnhancer={() => (
          <Button onClick={() => setTransactions(filterBySearchWord({ searchWord }))} >
          search
          </Button>
        )}
      />
    </>
  );
}

const SetNewState = ({ setGroups, setTransactions, setUpGroupsAndTransactions, date }) => (dateFromInput) => {
  const { normalizedGroups, freeTransactions } = setUpGroupsAndTransactions({ date: dateFromInput ? dateFromInput : date })
  setGroups(normalizedGroups)
  setTransactions(freeTransactions)
}

function MoneyManager() {
  const [date, setDate] = React.useState([]);
  const { normalizedGroups, freeTransactions } = setUpGroupsAndTransactions({})
  const [ groups, setGroups ] = React.useState(normalizedGroups);
  const [ transactions, setTransactions ] = React.useState(freeTransactions);
  const setNewState = SetNewState({ setGroups, setTransactions, setUpGroupsAndTransactions, date })
  
  return (
    <div className="MoneyManager">
      
      <DateInput props={{ setNewState, date, setDate }}/>

      <div className='groups'>
        <HeadingLevel>
          <Heading styleLevel={5}>Groups</Heading>
        </HeadingLevel>
        <Groups props={{ groups, setNewState }}/>
      </div>

      <div className='transactions'>
        <SearchTransactions props={{ transactions: freeTransactions, setTransactions }}/>
        <Transactions transactions={transactions}/>
      </div>
    </div>
  );
}

export default MoneyManager;
