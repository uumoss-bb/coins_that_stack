import * as React from 'react';
import './App.css';
import Groups from './components/Groups';
import setGroupsFromStorage from './workers/setGroupsFromStorage';
import Transactions from './components/Transactions'
import {
  capitalOne,
  elevations
} from './transactions'
import filterTransactionByKeywords from './workers/filterTransactionsByKeywords';

function App() {
  const [ groups, setGroups ] = React.useState(setGroupsFromStorage());
  const allTransactions = [ ...elevations, ...capitalOne ]

  const { groupsWithTransactions, freeTransactions } = filterTransactionByKeywords({ transactions: allTransactions, groups })
  console.log(groupsWithTransactions)
  return (
    <div className="App">
      <div className='groups'>
        <Groups props={{ groups: groupsWithTransactions, setGroups }}/>
      </div>

      <div className='transactions'>
        <Transactions transactions={freeTransactions}/>
      </div>
    </div>
  );
}

export default App;
