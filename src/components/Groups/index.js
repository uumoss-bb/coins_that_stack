import * as React from 'react';
import * as R from 'ramda'
import { connect } from 'react-redux';
import { setGroups } from '../../state/actions';
import { Heading, HeadingLevel } from 'baseui/heading';
import GroupList from './GroupList';
import filterTransByDate from '../../shared/filterTransByDate'

const filterGroupTransactions = ({ groups, date }) => R.pipe(
  Object.values,
  R.map(group => ({
    ...group,
    transactions: filterTransByDate({ transactions: group.transactions, date})
  }))
)(groups)

const Groups = ({ date, groups, _setGroups }) => {
  const normalizedGroups = filterGroupTransactions({ groups, date })
  return (
    <div className='groups'>
      <HeadingLevel>
        <Heading styleLevel={5}>Groups</Heading>
      </HeadingLevel>
      <GroupList props={{ groups: normalizedGroups, setGroups: _setGroups }}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  date: state.sortDate,
  groups: state.groups
});

const mapDispatchToProps = {
  _setGroups: setGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
