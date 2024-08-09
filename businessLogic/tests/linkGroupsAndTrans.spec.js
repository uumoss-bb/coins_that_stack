import linkGroupsAndTrans from "../linkGroupsAndTrans"

describe("Link Groups and Transactions", () => {

  const amazonWithdraw = {
    title: 'amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 'Tue Jul 30 2024',
    category: '',
    type: 'withdraw',
    transaction: -20,
    balance: 800,
    source: 'FORT_FINANCIAL',
    groups: []
  }

  const bobsDeposit = {
    title: 'ach deposit bobs burger worl direct dep asdf2134 vw balserbrodie',
    date: 'Fri Jun 28 2024',
    category: '',
    type: 'deposit',
    transaction: 4000,
    balance: 5000,
    source: 'FORT_FINANCIAL',
    groups: []
  }

  const wallyDeposit = {
    title: 'ach deposit wally world direct dep asdf2134 vw balserbrodie',
    date: 'Fri Jun 28 2024',
    category: '',
    type: 'deposit',
    transaction: 5000,
    balance: 7000,
    source: 'FORT_FINANCIAL',
    groups: []
  }

  const cigarAmazonWithdraw = {
    title: 'cigar amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 'Tue Jul 30 2024',
    category: '',
    type: 'withdraw',
    transaction: -30,
    balance: 800,
    source: 'FORT_FINANCIAL',
    groups: []
  }

  const transactions =  [
    amazonWithdraw,
    bobsDeposit,
    wallyDeposit,
    cigarAmazonWithdraw
  ]

  const groups = {
    "groupA": {
      name:'groupA',
      keywords: ['amazon'],
      transactions: [],
      coins: 0
    },
    "groupB": {
      name:'groupB',
      keywords: ['bobs burger', 'cigar'],
      transactions: [],
      coins: 0
    }
  }

  const linkedResult = {
    "transactions": [
      { ...amazonWithdraw, "groups": [ "groupA" ] },
      { ...bobsDeposit, "groups": [ "groupB" ] },
      { ...wallyDeposit, "groups": [] },
      { ...cigarAmazonWithdraw, "groups": [ "groupA", "groupB" ] }
    ],
    "groups": {
      "groupA": {
        "name": "groupA",
        "keywords": [ "amazon" ],
        "transactions": [
          { ...amazonWithdraw, "groups": [ "groupA" ] },
          { ...cigarAmazonWithdraw, "groups": [ "groupA", "groupB" ] }
        ],
        "coins": -50
      },
      "groupB": {
        "name": "groupB",
        "keywords": ['bobs burger', 'cigar'],
        "transactions": [
          { ...bobsDeposit, "groups": [ "groupB" ] },
          { ...cigarAmazonWithdraw, "groups": [ "groupA", "groupB" ] }
        ],
        "coins": 3970
      }
    }
  }

  it("return transactions with accurate groups and groups with accurate transactions + coins", () => {
    const result = linkGroupsAndTrans(groups, transactions)
    expect(result).toEqual(linkedResult)
  })
})
