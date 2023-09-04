import * as React from 'react';
import { connect } from 'react-redux';
import SearchTrans from './SearchTrans';
import TransList from './TransList';
import filterTransByDate from '../../shared/filterTransByDate'

const Transactions = ({ date, _transWithNoGroups }) => {
  const [ searchResults, setSearchResults ] = React.useState(null);
  const transactions = filterTransByDate({transactions: (searchResults || _transWithNoGroups), date})

  return (
    <div className='transactions'>
      <SearchTrans props={{ transactions: _transWithNoGroups, setSearchResults }}/>
      <TransList transactions={transactions}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  date: state.sortDate,
  _transWithNoGroups: state.transWithNoGroups
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
