import * as React from 'react';
import './App.css';
import {
  capitalOne,
  elevations
} from './transactions'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Storage from './Storage'

const groups = {}

const GroupCreationInput = ({ props: { newGroupName, setGroupName} }) => {

  return (
    <Input
      value={newGroupName}
      onChange={e => setGroupName(e.target.value)}
      placeholder="Create a Group"
      clearOnEscape
      endEnhancer={<Button onClick={() => setGroup({ name: newGroupName, transactions: [] })}>Set</Button>}
    />
  );
}

const setGroup = ({ name, transactions }) => {
  groups[name] = {
    name: name,
    transactions: transactions
  }
}

const saveGroups = () => {
  console.log({groups})
  for (const name in groups) {
    const group = groups[name]
    Storage.post({key: name, value: group})
  }
}

const SaveButton = () => {
  const style = {
    'display': 'flex',
    margin: '1%'
  }
  return (
    <Button 
      overrides={{
        BaseButton: {
          style
        }
      }} 
      onClick={() => saveGroups()}
    >
      Save!
    </Button>
  );
}
// const Groups = () => {
//   return (
//     <Accordion
//       onChange={({ expanded }) => console.log(expanded)}
//       accordion
//     >
//     </Accordion>
//   );
// }

// const Group = ({title}) => {
//   <Panel title >

//   </Panel>
// }

// const TransactionInGroup = () => {
//   return (
//     <ListItem>
//       <ListItemLabel>Label</ListItemLabel>
//     </ListItem>
//   );
// }

function App() {
  const [ newGroupName, setGroupName ] = React.useState("");

  return (
    <div className="App">
      <GroupCreationInput props={{ newGroupName, setGroupName }}/>
      <SaveButton/>
    </div>
  );
}

export default App;
