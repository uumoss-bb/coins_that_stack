import * as React from 'react';
import './App.css';
import Groups from './components/Groups';
import setGroupsFromStorage from './workers/setGroupsFromStorage';
import Transactions from './components/Transactions'
import {
  capitalOne,
  elevations
} from './transactions'
import setUpGroupsAndTransactions from './workers/setUpGroupsAndTransactions';
import DateInput from './components/DateInput';

function App() {
  const [ groups, setGroups ] = React.useState(setGroupsFromStorage());
  const [date, setDate] = React.useState([new Date()]);
  const allTransactions = [ ...elevations, ...capitalOne ]
  const { groupsWithTransactions, freeTransactions } = setUpGroupsAndTransactions({ transactions: allTransactions, groups, date })

  return (
    <div className="App">
      <DateInput props={{ date, setDate }}/>
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
