import * as React from 'react';
import { Table } from "baseui/table-semantic";

const normalizeData = ({ source, title, transaction, date }) => ([ source, title, transaction, date ])

const Transactions = ({ transactions }) => {
  if(transactions?.length) {
    return (
      <Table
        columns={['source', 'title', 'transaction', 'date']}
        data={transactions.map(trans => normalizeData(trans))}
      />
    )
  }

  return null
}

export default Transactions
