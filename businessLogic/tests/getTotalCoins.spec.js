import getTotalCoins from "../getTotalCoins"

describe("Get Total Coins", () => {

  const amazonWithdraw = {
    title: 'amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 'Tue Jul 31 2024',
    category: '',
    type: 'withdraw',
    transaction: -20,
    balance: 9980,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const cigarAmazonWithdraw = {
    title: 'cigar amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 'Tue Jul 32 2024',
    category: '',
    type: 'withdraw',
    transaction: -30,
    balance: 9950,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const bobsDeposit = {
    title: 'ach deposit bobs burger worl direct dep asdf2134 vw balserbrodie',
    date: 'Fri Jun 28 2024',
    category: '',
    type: 'deposit',
    transaction: 4000,
    balance: 4000,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const wallyDeposit = {
    title: 'ach deposit wally world direct dep asdf2134 vw balserbrodie',
    date: 'Fri Jun 30 2024',
    category: '',
    type: 'deposit',
    transaction: 5000,
    balance: 9000,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const transactions =  [
    amazonWithdraw,
    bobsDeposit,
    wallyDeposit,
    cigarAmazonWithdraw
  ]

  const totalResult = {
    "deposit": {
     "transactions": [
      bobsDeposit,
      wallyDeposit
     ],
     "total": 9000
    },
    "withdraw": {
     "transactions": [
      amazonWithdraw,
      cigarAmazonWithdraw
     ],
     "total": -50
    }
   }

  it("return a sum total of the deposits and withdraws with the transactions linked", () => {
    const result = getTotalCoins(transactions)
    expect(result).toEqual(totalResult)
  })
})
