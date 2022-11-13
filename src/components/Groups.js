import * as React from 'react';
import * as R from 'ramda'
import Storage from '../workers/Storage'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StatelessAccordion, Panel } from "baseui/accordion";
import setGroupsFromStorage from '../workers/setGroupsFromStorage';
import Transactions from './/Transactions';

const SaveGroup = ({ groups, setGroups }) => ({ name, keywords = [] }) => {
  console.log(keywords)
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

const SetKeyword = ({ saveGroup, name, keywords }) => {
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

const Group = ({ name, keywords, index, saveGroup }) => {
  const _keywords = keywords.join(', ')
  return (
    <Panel key={index + name} title={`${name} ( keywords: ${_keywords} )`}>
      {SetKeyword({ saveGroup, name, keywords: _keywords })}
      {/* { transactions.map(trans => {
        return (<Transactions props={{...trans}}/>)
      })} */}
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
      {groupsArr.map((group, index) => Group({...group, index, saveGroup }) )}
    </StatelessAccordion>
  );
}

export default Groups