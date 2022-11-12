import * as React from 'react';
import './App.css';
import Storage from './workers/Storage'
import uuid from './workers/uuid'
import {
  capitalOne,
  elevations
} from './transactions'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StatelessAccordion, Panel } from "baseui/accordion";
import { ListItem, ListItemLabel } from "baseui/list";

const setGroupsFromStorage = () => {
  const storedGroups = Storage.getAll()
  
  return storedGroups.reduce((groups, group) => ({
    ...groups,
    [group.name] : group
  }), {})
}

const SaveGroup = ({ groups, setGroups }) => ({ name, transactions }) => {
  const newGroup = {
    name: name,
    transactions: transactions
  }

  Storage.post({key: name, value: newGroup})

  setGroups({
    ...groups,
    newGroup
  })
}

const CreateGroup = ({ saveGroup }) => {
  const [ newName, setNewName ] = React.useState("");

  const style = {
    'display': 'flex',
    width: '95%',
    margin: '2.5%'
  }

  return (
    <Panel Key={'CreateGroup'} title='Create a Group'>
      <Input
        value={newName}
        onChange={e => setNewName(e.target.value)}
        placeholder="New Group Name..."
        clearOnEscape
      />
      <Button 
        overrides={{
          BaseButton: {
            style
          }
        }} 
        onClick={() => {
          setNewName('')
          saveGroup({ name: newName, transactions: [] })
        }}
      >
        create
      </Button>
    </Panel>
  );
}

const RemoveGroup = ({ setGroups }) => ({ name }) => {

  Storage.delete({ key: name })

  setGroups(setGroupsFromStorage())
}

const DeleteGroup = ({ removeGroup }) => {
  const [ deleteName, setDeleteName ] = React.useState("");

  const style = {
    'display': 'flex',
    width: '95%',
    margin: '2.5%'
  }

  return (
    <Panel Key={'deleteGroup'} title='Delete a Group'>
      <Input
        value={deleteName}
        onChange={e => setDeleteName(e.target.value)}
        placeholder="Name of group to delete"
        clearOnEscape
      />
      <Button 
        overrides={{
          BaseButton: {
            style
          }
        }} 
        onClick={() => {
          setDeleteName('')
          removeGroup({ name: deleteName })
        }}
      >
        delete
      </Button>
    </Panel>
  );
}

const Groups = ({props: {groups, setGroups}}) => {
  const groupsArr = Object.values(groups)
  const saveGroup = SaveGroup({ groups, setGroups })
  const removeGroup = RemoveGroup({ setGroups })

  const [expanded, setExpanded] = React.useState([]);

  return (
    <StatelessAccordion
      expanded={expanded}
      onChange={({ expanded }) => setExpanded(expanded)}
    >
      {CreateGroup({ saveGroup })}
      {DeleteGroup({ removeGroup })}
      {groupsArr.map((group, index) => Group({...group, index}) )}
    </StatelessAccordion>
  );
}

const Group = ({ name, transactions, index}) => {
  return (
    <Panel Key={index + name} title={name} disabled={transactions.length ? false : true}>
      { transactions.map(transaction => {
        console.log(transaction)
        return (<Transaction props={{}}/>)
      })}
    </Panel>
  )
}

const Transaction = ({ props: { Description } }) => {
  return (
    <ListItem Key={uuid()}>
      <ListItemLabel>Label</ListItemLabel>
    </ListItem>
  );
}

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
