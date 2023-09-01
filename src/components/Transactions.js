import * as React from 'react';
import { Table } from "baseui/table-semantic";
import { Heading, HeadingLevel } from 'baseui/heading';
import calculateMoney from '../workers/calculateMoney';

const normalizeData = ({ source, type, title, transaction, date, category }) => ([ source, type, title, transaction, date, category ])

const Transactions = ({ transactions }) => {

  if(transactions?.length) {
    
    const _transactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalMoney = calculateMoney(_transactions)
    
    return (
      <>
        <HeadingLevel>
            <Heading styleLevel={5}>Total: ${totalMoney.OUT.total.toFixed(0)}</Heading>
          </HeadingLevel>
        <Table
          columns={['source', 'type', 'title', 'transaction', 'date', 'category']}
          data={_transactions.map(trans => normalizeData(trans))}
        />
      </>
    )
  }

  return null
}

export default Transactions
