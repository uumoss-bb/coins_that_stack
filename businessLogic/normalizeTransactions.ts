import {
  TransType,
  TransSourceNames,
  FortFinTrans,
  Transaction,
  Transactions,
  DirtyTransactions
} from '../shared/types/transactions'
import { TransSources } from '../shared/enums/transactions'
import { selectTruthyItems } from '../shared/selectors'
import { convertDate, normalizeText } from '../shared/normalizers'

const getTransactionType = (transaction: number): TransType => transaction > 0 ? 'deposit' : 'withdraw'

const normalizeFortFinTitle = (title: string) => {
  title = title.replace('Credit or debit card Withdrawal', '')
  title = normalizeText(title)
  return title
}

const normalizeCoin = (amount: string) => {
  amount = amount.replace('$', '')
  amount = amount.replace(',', '')
  amount = Number(amount).toFixed(0)
  return Number(amount)
}

const normalizeFortFinancial = (transItem: FortFinTrans): Transaction|null => {
  const { Amount, Description, Date: date, Category, Balance } = transItem
  const title = normalizeFortFinTitle(Description)
  const transaction = normalizeCoin(Amount)

  if(title.includes('online transfer')) {
    return null
  }

  return {
    title: normalizeFortFinTitle(Description),
    date: convertDate.milliseconds(date),
    category: Category,
    type: getTransactionType(transaction),
    transaction,
    balance: normalizeCoin(Balance),
    source: TransSources.FORT_FINANCIAL,
    stacks: []
  }
}

const normalizerFunctions = {
  [TransSources.FORT_FINANCIAL]: normalizeFortFinancial
}

const normalizeTransactions = ( source: TransSourceNames, transactions: DirtyTransactions ): Transactions => {
  return transactions
    .map(normalizerFunctions[source])
    .filter(selectTruthyItems) as Transactions
}

export default normalizeTransactions
