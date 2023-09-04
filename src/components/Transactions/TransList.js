import * as React from 'react';
import { Table } from "baseui/table-semantic";
import { Heading, HeadingLevel } from 'baseui/heading';
import calculateMoney from '../../shared/calculateMoney';

const normalizeData = ({ source, type, title, transaction, date, category }) => ([ source, type, title, transaction, date, category ])

const TransList = ({ transactions: _transactions }) => {
  if(_transactions?.length) {
    
    const transactions = _transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalMoney = calculateMoney(transactions)

    return (
      <>
        <HeadingLevel>
            <Heading styleLevel={5}>Total: ${totalMoney.OUT.total.toFixed(0)}</Heading>
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

export default TransList
