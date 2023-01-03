import * as React from 'react';
import { Table } from "baseui/table-semantic";
import { Heading, HeadingLevel } from 'baseui/heading';

const normalizeData = ({ source, type, title, transaction, date, category }) => ([ source, type, title, transaction, date, category ])

const Transactions = ({ transactions }) => {
  if(transactions?.length) {
    return (
      <>
        <HeadingLevel>
            <Heading styleLevel={5}>Total: {transactions.length}</Heading>
          </HeadingLevel>
        <Table
          columns={['source', 'type', 'title', 'transaction', 'date', 'category']}
          data={transactions.map(trans => normalizeData(trans))}
        />
      </>
    )
  }

  return null
}

export default Transactions
