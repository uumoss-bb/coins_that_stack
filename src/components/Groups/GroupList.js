import * as React from 'react';
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StatelessAccordion, Panel } from "baseui/accordion";
import TransList from '../Transactions/TransList';
import { Heading, HeadingLevel } from 'baseui/heading';

const defaultGroup = {
  name: 'group',
  keywords: [],
  color: '#FFFFFF'
}

const SaveGroup = ({ setGroups, groups }) => ({ group = {}, ...newData }) => {
  const newGroup = {
    ...group,
    ...newData
  }

  setGroups({
    groups: {
      ...groups,
      [newGroup.name]: newGroup
    }
  })
}

const RemoveGroup = ({ setGroups, groups }) => ({ name }) => {
  const newGroups = groups.filter(group => group.name !== name)
  setGroups({ groups: newGroups })
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
          saveGroup({ group: {
            ...defaultGroup,
            name: newName
          }})
          setNewName('')
        }}
      >
        create
      </Button>
    </Panel>
  );
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

const SetKeyword = ({props: { saveGroup, group, keywords }}) => {
  const [ newKeywords, setKeywords ] = React.useState(keywords);
  
  const style = {
    'display': 'flex',
    margin: '.5% 0 .5% 0'
  }

  return (
    <>
      <Input
        value={newKeywords}
        onChange={e => setKeywords(e.target.value)}
        placeholder="Set a key word"
        clearOnEscape
        overrides={{
          BaseButton: {
            style
          }
        }} 
        endEnhancer={() => (
          <Button
            onClick={() => 
              saveGroup({ 
                group,
                keywords: newKeywords ? newKeywords.split(', ') : []
              })
            }
          >
          set
          </Button>
        )}
      />
    </>
  );
}

const Group = ({ group, index, saveGroup, removeGroup }) => {
  const { name, keywords, transactions, coinsSpent } = group
  const _keywords = keywords?.join(', ')
  const title = `${name} - total: $${coinsSpent}`

  return (
    <Panel 
      key={index + name} 
      title={title}
    >
      <DeleteGroupBtn props={{ name, removeGroup }}/>
      <SetKeyword props={{ saveGroup, group, keywords: _keywords }}/>
      <TransList transactions={ transactions }/>
    </Panel>
  )
}

const GroupList = ({props: { groups, setGroups }}) => {

  const saveGroup = SaveGroup({ setGroups, groups })
  const removeGroup = RemoveGroup({ setGroups, groups })
  const coinsSpentInAll = Object.values(groups).reduce((res, { coinsSpent }) => res += coinsSpent, 0)
  const [expanded, setExpanded] = React.useState([]);
  
  return (
    <>
      <HeadingLevel>
        <Heading styleLevel={6}>{`All Coin Spent: ${coinsSpentInAll}`}</Heading>
      </HeadingLevel>
      <StatelessAccordion
        expanded={expanded}
        onChange={({ expanded }) => setExpanded(expanded)}
      >
        {CreateGroup({ saveGroup })}
        {groups.map((group, index) => Group({ group, index, saveGroup, removeGroup }) )}
      </StatelessAccordion>
    </>
  );
}

export default GroupList
