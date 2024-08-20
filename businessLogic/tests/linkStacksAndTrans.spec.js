import linkStacksAndTrans from "../linkStacksAndTrans"

describe("Link Stacks and Transactions", () => {

  const amazonWithdraw = {
    title: 'amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 'Tue Jul 30 2024',
    category: '',
    type: 'withdraw',
    transaction: -20,
    balance: 800,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const bobsDeposit = {
    title: 'ach deposit bobs burger worl direct dep asdf2134 vw balserbrodie',
    date: 'Fri Jun 28 2024',
    category: '',
    type: 'deposit',
    transaction: 4000,
    balance: 5000,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const wallyDeposit = {
    title: 'ach deposit wally world direct dep asdf2134 vw balserbrodie',
    date: 'Fri Jun 28 2024',
    category: '',
    type: 'deposit',
    transaction: 5000,
    balance: 7000,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const cigarAmazonWithdraw = {
    title: 'cigar amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 'Tue Jul 30 2024',
    category: '',
    type: 'withdraw',
    transaction: -30,
    balance: 800,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const transactions =  [
    amazonWithdraw,
    bobsDeposit,
    wallyDeposit,
    cigarAmazonWithdraw
  ]

  const stacks = {
    "stackA": {
      name:'stackA',
      keywords: ['amazon'],
      transactions: [],
      coins: 0
    },
    "stackB": {
      name:'stackB',
      keywords: ['bobs burger', 'cigar'],
      transactions: [],
      coins: 0
    }
  }

  const linkedResult = {
    "transactions": [
      { ...amazonWithdraw, "stacks": [ "stackA" ] },
      { ...bobsDeposit, "stacks": [ "stackB" ] },
      { ...wallyDeposit, "stacks": [] },
      { ...cigarAmazonWithdraw, "stacks": [ "stackA", "stackB" ] }
    ],
    "stacks": {
      "stackA": {
        "name": "stackA",
        "keywords": [ "amazon" ],
        "transactions": [
          { ...amazonWithdraw, "stacks": [ "stackA" ] },
          { ...cigarAmazonWithdraw, "stacks": [ "stackA", "stackB" ] }
        ],
        "coins": -50
      },
      "stackB": {
        "name": "stackB",
        "keywords": ['bobs burger', 'cigar'],
        "transactions": [
          { ...bobsDeposit, "stacks": [ "stackB" ] },
          { ...cigarAmazonWithdraw, "stacks": [ "stackA", "stackB" ] }
        ],
        "coins": 3970
      }
    }
  }

  it("return transactions with accurate stacks and stacks with accurate transactions + coins", () => {
    const result = linkStacksAndTrans(stacks, transactions)
    expect(result).toEqual(linkedResult)
  })
})
