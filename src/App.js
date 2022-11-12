import * as React from 'react';
import './App.css';
import Groups from './components/Groups';
import setGroupsFromStorage from './workers/setGroupsFromStorage';
import Transaction from './components/Transacion';
import {
  capitalOne,
  elevations
} from './transactions'

const normalizeElevationsData = ({ Memo, Date, Amount_Debit, Balance}) => ({
  source: 'elevations',
  title: Memo,
  transaction: Amount_Debit,
  balance: Balance,
  date: Date
})

const normalizeCapitalOneData = ({ Description, Transaction_Date, Debit }) => ({
  source: 'capitalOne',
  title: Description,
  transaction: - Debit,
  date: Transaction_Date
})

const Transactions = () => ([
  ...elevations.map((trans) => <Transaction props={normalizeElevationsData(trans)}/>),
  ...capitalOne.map((trans) => <Transaction props={normalizeCapitalOneData(trans)}/>)
])

function App() {
  const [ groups, setGroups ] = React.useState(setGroupsFromStorage());

  return (
    <div className="App">
      <div className='groups'>
        <Groups props={{ groups, setGroups }}/>
      </div>

      <div className='transactions'>
        <Transactions/>
      </div>
    </div>
  );
}

export default App;
