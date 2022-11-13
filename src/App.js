import * as React from 'react';
import './App.css';
import Groups from './components/Groups';
import setGroupsFromStorage from './workers/setGroupsFromStorage';
import Transactions from './components/Transactions'
import {
  capitalOne,
  elevations
} from './transactions'

function App() {
  const [ groups, setGroups ] = React.useState(setGroupsFromStorage());

  return (
    <div className="App">
      <div className='groups'>
        <Groups props={{ groups, setGroups }}/>
      </div>

      <div className='transactions'>
        <Transactions props={{
          elevations,
          capitalOne
        }}/>
      </div>
    </div>
  );
}

export default App;
