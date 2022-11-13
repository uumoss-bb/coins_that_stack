import * as React from 'react';
import { Table } from "baseui/table-semantic";

const normalizeElevationsData = ({ Memo, Date, Amount_Debit }) => ([
  'elevations',
  Memo,
  Amount_Debit,
  Date
])

const normalizeCapitalOneData = ({ Description, Transaction_Date, Debit }) => ([
  'capitalOne',
  Description,
  `- ${Debit}`,
  Transaction_Date
])

const Transactions = ({props: { elevations, capitalOne }}) => {
  return (
    <Table
      columns={['Source', 'title', 'transaction', 'date']}
      data={[
        ...elevations.map(trans => normalizeElevationsData(trans)),
        ...capitalOne.map(trans => normalizeCapitalOneData(trans))
      ]}
    />
  )
}

export default Transactions
