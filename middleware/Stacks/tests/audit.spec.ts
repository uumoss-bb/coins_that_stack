import { WEEK_MS } from '../../../shared/enums/time';
import { Stacks } from '../../../shared/types/stacks';
import audit from '../audit'

const income = 1000
const baseStackCoins = 3000
const lastUpdated = Date.now() - (WEEK_MS * 2)

const stacks: Stacks = {
  'TestA': {
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

jest.mock('../Transactions/getTransactions', () => ({
  __esModule: true,
  default: () => ([
    {
      title: 'prime video',
      date: Date.now(),
      category: '',
      type: 'withdraw',
      coins: -100,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    },
    {
      title: 'pay day',
      date: Date.now(),
      category: '',
      type: 'deposit',
      coins: 1000,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    }
  ])
}));

describe('audit', () => {
  it('success', () => {
    const result = audit()
    expect(result).toBe("TODO THIS BITCH")
  })
})
