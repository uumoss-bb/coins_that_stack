import { convertDate } from '../../../shared/normalizers';
import audit from '../audit'

Date.now = () => 788936400000

jest.mock('../../Transactions/getTransactions', () => ({
  __esModule: true,
  default: () => ([
    {
      title: 'prime video',
      date: new Date("Jan 8, 1995").getTime(),
      category: '',
      type: 'withdraw',
      coins: -100,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    },
    {
      title: 'pay day',
      date: new Date("Jan 8, 1995").getTime(),
      category: '',
      type: 'deposit',
      coins: 1000,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    }
  ])
}));

jest.mock('../getStacks', () => ({
  __esModule: true,
  default: () => ({
    stacks: {
      'TestA': {
        name: 'TestA',
        components: { keywords: ['prime'], transactions: [] },
        coins: 3000,
        depositCadence: {
          type: 'percent',
          incidence: 'weekly',
          amount: 10,
          importanceLevel: 1,
          lastUpdated: new Date("Jan 1, 1995").getTime()
        }
      }
    },
    lastUpdated: new Date("Jan 1, 1995").getTime()
  })
}));

const auditResult = {
  latestStacks: {
    TestA: {
      name: 'TestA',
      components: {
        keywords: [
          'prime'
        ],
        transactions: [
          {
            title: 'prime video',
            date: 789541200000,
            category: '',
            type: 'withdraw',
            coins: -100,
            balance: 943,
            source: 'FORT_FINANCIAL',
            stacks: [
              'TestA'
            ]
          }
        ]
      },
      coins: 2900,
      depositCadence: {
        type: 'percent',
        incidence: 'weekly',
        amount: 10,
        importanceLevel: 1,
        lastUpdated: 788936400000
      }
    }
  },
  latestStackedTransactions: [
    {
      title: 'prime video',
      date: 789541200000,
      category: '',
      type: 'withdraw',
      coins: -100,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: [
        'TestA'
      ]
    }
  ],
  latestFreeTransactions: [],
  latestStackChanges: [
    {
      name: 'TestA',
      count: 1,
      original_coins: 3000,
      expenses: 2900,
      new_coins: 100
    }
  ],
  deposits: [
    {
      title: 'pay day',
      date: 789541200000,
      category: '',
      type: 'deposit',
      coins: 1000,
      balance: 943,
      source: 'FORT_FINANCIAL',
      stacks: []
    }
  ],
  fatStacks: [
    {
      name: 'TestA',
      components: {
        keywords: [
          'prime'
        ],
        transactions: []
      },
      coins: 3100,
      depositCadence: {
        type: 'percent',
        incidence: 'weekly',
        amount: 10,
        importanceLevel: 1,
        lastUpdated: Date.now()
      },
    }
  ]
}

describe('audit', () => {
  it('success', () => {
    const result = audit()
    expect(result).toStrictEqual(auditResult)
  })
})
