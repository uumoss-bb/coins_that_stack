import { WEEK_MS } from '../../shared/enums/time';
import { Stacks } from '../../shared/types/stacks';
import audit from '../audit'
import _Income from '../Income';
import _Stacks from '../Stacks';

const income = 1000
const baseStackCoins = 3000
const lastUpdated = Date.now() - (WEEK_MS * 2)

const stacks: Stacks = {
  'testA': {
    "name": "TestA",
    "keywords": ['prime'],
    "transactions": [],
    "coins": baseStackCoins,
    "deposit": {
      "type": "percent",
      "incidence": "weekly",
      "amount": 10,
      "importanceLevel": 1,
      "lastUpdated": Date.now() - (WEEK_MS * 3)
    },
    "group": "House"
  }
}

jest.mock('../getTransactions', () => ({
  __esModule: true,
  default: () => ([
    {
      title: 'prime video',
      date: Date.now(),
      category: '',
      type: 'withdraw',
      transaction: -100,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    },
    {
      title: 'pay day',
      date: Date.now(),
      category: '',
      type: 'deposit',
      transaction: 1000,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    }
  ])
}));

describe('audit', () => {
  it('success', () => {
    const CurrentStacks = new _Stacks(lastUpdated, stacks)
    const Income = new _Income(income, 'payDat')
    const result = audit(CurrentStacks, Income)
    console.log(result)
  })
})
