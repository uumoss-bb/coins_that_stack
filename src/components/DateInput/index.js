import * as React from 'react'
import './style.css'
import { DatePicker } from "baseui/datepicker";
import {Heading, HeadingLevel} from 'baseui/heading';

const DateInput = ({props: { setNewState}}) => {
  const [date, setDate] = React.useState([new Date()]);

  return (
    <div className='dateInput'>
      <HeadingLevel>
        <Heading styleLevel={5}>Pick Date to Filer By </Heading>
      </HeadingLevel>
      <DatePicker
        value={date}
        onChange={({ date }) => {
          setDate(date)
          setNewState({ date })
        }
        }
      />
    </div>
  )
}

export default DateInput