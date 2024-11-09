import { Transaction, Transactions } from "../../shared/types/transactions"
import getTotalCoins from "../getTotalCoins"

describe("Get Total Coins", () => {

  const amazonWithdraw: Transaction = {
    title: 'amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 0,
    category: '',
    type: 'withdraw',
    coins: -20,
    balance: 9980,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const cigarAmazonWithdraw: Transaction = {
    title: 'cigar amazon mktpl*rv0sb16k0 amzn.com/bill wa',
    date: 0,
    category: '',
    type: 'withdraw',
    coins: -30,
    balance: 9950,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const bobsDeposit: Transaction = {
    title: 'ach deposit bobs burger worl direct dep asdf2134 vw balserbrodie',
    date: 0,
    category: '',
    type: 'deposit',
    coins: 4000,
    balance: 4000,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const wallyDeposit: Transaction = {
    title: 'ach deposit wally world direct dep asdf2134 vw balserbrodie',
    date: 0,
    category: '',
    type: 'deposit',
    coins: 5000,
    balance: 9000,
    source: 'FORT_FINANCIAL',
    stacks: []
  }

  const transactions: Transactions =  [
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
