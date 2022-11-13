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

const normalizeBySource = {
  elevations: normalizeElevationsData,
  capitalOne: normalizeCapitalOneData
}

const Transactions = ({ transactions }) => {
  return (
    <Table
      columns={['Source', 'title', 'transaction', 'date']}
      data={transactions.map(trans => {
        if(trans.source) {
          return normalizeBySource[trans.source](trans)
        }
        return []
      })}
    />
  )
}

export default Transactions
