import * as React from 'react';
import * as R from 'ramda'
import Storage from '../workers/Storage'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StatelessAccordion, Panel } from "baseui/accordion";
import Transactions from './Transactions';
import setGroupsFromStorage from '../workers/setGroupsFromStorage';

const SaveGroup = ({ groups, setGroups }) => ({ name, keywords = [] }) => {
  const newGroup = {
    name,
    keywords
  }

  Storage.post({key: name, value: newGroup})

  setGroups({
    ...groups,
    [name]: newGroup
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
          saveGroup({ name: newName })
          setNewName('')
        }}
      >
        create
      </Button>
    </Panel>
  );
}

const RemoveGroup = ({ groups, setGroups }) => ({ name }) => {

  Storage.delete({ key: name })
  
  setGroups(setGroupsFromStorage())
}

const DeleteGroupBtn = ({props: { name, removeGroup }}) => {

  const style = {
    'display': 'flex',
    width: '95%',
    margin: '2.5%'
  }

  return (
    <Button 
      overrides={{
        BaseButton: {
          style
        }
      }} 
      onClick={() => {
        removeGroup({ name })
      }}
    >
      delete
    </Button>
  );
}

const SetKeyword = ({props: { saveGroup, name, keywords }}) => {
  const [ newKeywords, setKeywords ] = React.useState(keywords);

  const style = {}

  return (
    <>
      <Input
        value={newKeywords}
        onChange={e => setKeywords(e.target.value)}
        placeholder="Set a key word"
        clearOnEscape
        endEnhancer={() => (
          <Button 
            overrides={{
              BaseButton: {
                style
              }
            }} 
            onClick={() => {
              saveGroup({ 
                name, 
                keywords: newKeywords.split(', ')
              })
            }}
          >
          set
          </Button>
        )}
      />
    </>
  );
}

const Group = ({ group: { name, keywords, transactions, coinsSpent }, index, saveGroup, removeGroup }) => {
  const _keywords = keywords?.join(', ')
  const title = `${name} total: $${coinsSpent} ( keywords: ${_keywords ? _keywords : 'none'} )`
  return (
    <Panel key={index + name} title={title}>
      <DeleteGroupBtn props={{ name, removeGroup }}/>
      <SetKeyword props={{ saveGroup, name, keywords: _keywords }}/>
      <Transactions transactions={ transactions }/>
    </Panel>
  )
}

const Groups = ({props: {groups, setGroups}}) => {
  const groupsArr = Object.values(groups)
  const saveGroup = SaveGroup({ groups, setGroups })
  const removeGroup = RemoveGroup({ groups, setGroups })

  const [expanded, setExpanded] = React.useState([]);

  return (
    <StatelessAccordion
      expanded={expanded}
      onChange={({ expanded }) => setExpanded(expanded)}
    >
      {CreateGroup({ saveGroup })}
      {groupsArr.map((group, index) => Group({ group, index, saveGroup, removeGroup }) )}
    </StatelessAccordion>
  );
}

export default Groups