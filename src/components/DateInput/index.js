import * as React from 'react'
import { connect } from 'react-redux';
import './style.css'
import { DatePicker } from "baseui/datepicker";
import {Heading, HeadingLevel} from 'baseui/heading';
import { setSortDate } from '../../state/actions';


const DateInput = ({ date, _setSortDate }) => (
  <div className='dateInput'>
    <HeadingLevel>
      <Heading styleLevel={5}>Pick Date to Filer By </Heading>
    </HeadingLevel>
    <DatePicker
      value={date}
      onChange={({ date }) => _setSortDate(date)}
      range
      positive
      clearable
    />
  </div>
)

const mapStateToProps = (state) => ({
  date: state.sortDate,
});

const mapDispatchToProps = {
  _setSortDate: setSortDate
};

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);
