import * as React from 'react';
import './App.css';
import Groups from './components/Groups';
import setGroupsFromStorage from './workers/setGroupsFromStorage';
import { Table } from "baseui/table-semantic";
import {
  capitalOne,
  elevations
} from './transactions'

const normalizeElevationsData = ({ Memo, Date, Amount_Debit }) => ([
  'elevations',
  Memo,
  Amount_Debit,
  Date
])

const normalizeCapitalOneData = ({ Description, Transaction_Date, Debit }) => ([
  'capitalOne',
  Description,
  `- ${Debit}`,
  Transaction_Date
])

const Transactions = () => {
  return (
    <Table
      columns={['Source', 'title', 'transaction', 'date']}
      data={[
        ...elevations.map(trans => normalizeElevationsData(trans))
      ]}
    />
  )
}

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
