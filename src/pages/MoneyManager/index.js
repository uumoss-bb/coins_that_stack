import * as React from 'react';
import './index.css';
import DateInput from '../../components/DateInput';
import Groups from '../../components/Groups';
import Transactions from '../../components/Transactions'

function MoneyManager() {
  return (
    <div className="MoneyManager">
      <DateInput/>
      <Groups/>
      <Transactions/>
    </div>
  );
}

export default MoneyManager
