import * as React from 'react';
import { Table } from "baseui/table-semantic";

const normalizeData = ({ source, title, transaction, date }) => ([ source, title, transaction, date ])

const Transactions = ({ transactions }) => {
  return (
    <Table
      columns={['source', 'title', 'transaction', 'date']}
      data={transactions.map(trans => normalizeData(trans))}
    />
  )
}

export default Transactions
