import * as React from 'react';
import { connect } from 'react-redux';
import './index.css';
import Groups from '../../components/Groups';
import Transactions from '../../components/Transactions'
import setUpGroupsAndTransactions from '../../shared/assignGroupsToTrans';
import DateInput from '../../components/DateInput';
import { normalizeText } from '../../shared/normalizers';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { setSortDate, setGroups } from '../../state/actions';

const FilterBySearchWord = ({ transactions }) => ({ searchWord }) => transactions.filter(transaction => normalizeText(transaction.title).includes(normalizeText(searchWord)))

const SearchTransactions = ({props: { transactions, setTransWithNoGroups }}) => {
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
          <Button onClick={() => setTransWithNoGroups(filterBySearchWord({ searchWord }))} >
          search
          </Button>
        )}
      />
    </>
  );
}

// const SetNewState = ({ setGroups, setTransactions, setUpGroupsAndTransactions, date }) => (dateFromInput) => {
//   const { normalizedGroups, freeTransactions } = setUpGroupsAndTransactions({ date: dateFromInput ? dateFromInput : date })
//   setGroups(normalizedGroups)
//   setTransactions(freeTransactions)
// }

function MoneyManager({
  date, setDate,
  groups, setGroups,
  transactions,
  _transWithNoGroups
}) {
  const [ transWithNoGroups, setTransWithNoGroups ] = React.useState(_transWithNoGroups);
  // WIP: get search seperated and working
  return (
    <div className="MoneyManager">
      
      <DateInput props={{ date, setDate }}/>

      <div className='groups'>
        <HeadingLevel>
          <Heading styleLevel={5}>Groups</Heading>
        </HeadingLevel>
        <Groups props={{ groups, transactions, setGroups }}/>
      </div>

      <div className='transactions'>
        <SearchTransactions props={{ transactions: transWithNoGroups, setTransWithNoGroups }}/>
        <Transactions transactions={transactions}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  date: state.sortDate,
  groups: state.groups,
  transactions: state.transactions,
  _transWithNoGroups: state.transWithNoGroups
});

const mapDispatchToProps = {
  setDate: setSortDate,
  setGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyManager);
