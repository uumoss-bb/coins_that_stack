import * as React from 'react';
import Storage from '../workers/Storage'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StatelessAccordion, Panel } from "baseui/accordion";
import setGroupsFromStorage from '../workers/setGroupsFromStorage';
import Transaction from './Transacion';

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
          saveGroup({ name: newName, transactions: [] })
          setNewName('')
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
          removeGroup({ name: deleteName })
          setDeleteName('')
        }}
      >
        delete
      </Button>
    </Panel>
  );
}

const Group = ({ name, transactions, index}) => {
  return (
    <Panel key={index + name} title={name} disabled={transactions.length ? false : true}>
      { transactions.map(trans => {
        return (<Transaction props={{...trans}}/>)
      })}
    </Panel>
  )
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

export default Groups