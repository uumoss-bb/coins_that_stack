import * as React from 'react';
import './App.css';
import Groups from './components/Groups';
import setGroupsFromStorage from './workers/setGroupsFromStorage';
import Transaction from './components/Transacion';

// const Transactions = () => {
//   const allTransactions = [
//     ...cap_2021,
//     ...cap_2022,
//     ...elevations_22_21
//   ]
// }

function App() {
  const [ groups, setGroups ] = React.useState(setGroupsFromStorage());

  return (
    <div className="App">
      <Groups props={{ groups, setGroups }}/>

      <div className='transactions'>
      </div>
    </div>
  );
}

export default App;
