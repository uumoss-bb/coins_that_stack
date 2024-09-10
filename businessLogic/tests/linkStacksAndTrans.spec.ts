import { Stack, Stacks } from "../../shared/types/stacks"
import { Transaction, Transactions } from "../../shared/types/transactions"
import linkStacksAndTrans, { ConnectedStacksAndTrans } from "../linkStacksAndTrans"

describe("Link Stacks and Transactions", () => {

  const amazonWithdraw: Transaction = {
    title: 'amazon',
    date: 0,
    category: '',
    type: 'withdraw',
    coins: -20,
    balance: 800,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const cigarAmazonWithdraw: Transaction = {
    title: 'cigar',
    date: 0,
    category: '',
    type: 'withdraw',
    coins: -30,
    balance: 800,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const deposit: Transaction = {
    title: 'cat in the hat',
    date: 0,
    category: '',
    type: 'deposit',
    coins: 30,
    balance: 800,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const transactions: Transactions =  [
    amazonWithdraw,
    cigarAmazonWithdraw,
    deposit
  ]

  const stackA: Stack = {
    name:'stackA',
    keywords: ['amazon'],
    transactions: [],
    coins: 0,
    deposit: {
      type: 'exact',
      incidence: 'bi-weekly',
      amount: 0,
      importanceLevel: null,
      lastUpdated: 0
    }
  }

  const stacks: Stacks = {
    [stackA.name] : stackA
  }

  const linkedResult: ConnectedStacksAndTrans = {
    deposits: [ deposit ],
    stackedTransactions: [
      { ...amazonWithdraw, stacks: [ stackA.name ] }
    ],
    nonStackedTransactions : [ cigarAmazonWithdraw ],
    stacks: {
      [stackA.name]: {
        ...stackA,
        coins: -20,
        transactions: [
          { ...amazonWithdraw, stacks: [ stackA.name ] }
        ]
      },
      Non_Stacked: {
        coins: -30,
        transactions: [ {...cigarAmazonWithdraw, stacks: [] }],
        name: 'Non-Stacked',
        keywords: [ 'non' ],
        deposit: {
          type: 'exact',
          incidence: 'bi-weekly',
          amount: 0,
          importanceLevel: null,
          lastUpdated: 0
        }
      }
    }
  }

  it("return transactions with accurate stacks and stacks with accurate transactions + coins", () => {
    const result = linkStacksAndTrans(stacks, transactions)
    expect(result).toEqual(linkedResult)
  })
})
