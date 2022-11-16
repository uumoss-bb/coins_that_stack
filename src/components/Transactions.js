import * as React from 'react';
import { Table } from "baseui/table-semantic";
import { Heading, HeadingLevel } from 'baseui/heading';

const normalizeData = ({ source, title, transaction, date }) => ([ source, title, transaction, date ])

const Transactions = ({ transactions }) => {
  if(transactions?.length) {
    return (
      <>
        <HeadingLevel>
            <Heading styleLevel={5}>Total: {transactions.length}</Heading>
          </HeadingLevel>
        <Table
          columns={['source', 'title', 'transaction', 'date']}
          data={transactions.map(trans => normalizeData(trans))}
        />
      </>
    )
  }

  return null
}

export default Transactions
