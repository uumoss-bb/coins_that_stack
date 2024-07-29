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
import { normalizeText } from '../shared/normalizers'

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

const normalizeFortFinancial = (transItem: FortFinTrans): Transaction => {
  const { Amount, Description, Date: date, Category, Balance } = transItem
  const transaction = normalizeCoin(Amount)
  return {
    title: normalizeFortFinTitle(Description),
    date: new Date(date).toDateString(),
    category: Category,
    type: getTransactionType(transaction),
    transaction,
    balance: normalizeCoin(Balance),
    source: TransSources.FORT_FINANCIAL,
    groups: []
  }
}

const normalizerFunctions = {
  [TransSources.FORT_FINANCIAL]: normalizeFortFinancial
}

interface TransNormalizerInput { source: TransSourceNames, transactions: DirtyTransactions }
const normalizeTransactions = ({ source, transactions }: TransNormalizerInput): Transactions => {
  return transactions
    .map(normalizerFunctions[source])
    .filter(selectTruthyItems)
}

export default normalizeTransactions
