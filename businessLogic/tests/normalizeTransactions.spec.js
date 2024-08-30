import normalizeTransactions from "../normalizeTransactions"
import { TransSources } from "../../shared/enums/transactions"

describe("Normalize Fort Financial Transactions", () => {

  const fortFinInput = [
    {
      "Account_ID": "123",
      "Transaction_ID": "B092341|20205435234",
      "Date": "07/30/24",
      "Description": "Credit or debit card Withdrawal AMAZON MKTPL*RV0SB16K0 Amzn.com/bill WA",
      "Check_Number": "",
      "Category": "",
      "Tags": "",
      "Amount": "-$30.88",
      "Balance": "$800.86"
    },
    {
      "Account_ID": "9123",
      "Transaction_ID": "B092341|2341245",
      "Date": "06/28/24",
      "Description": "ACH Deposit BOBS BURGER WORL DIRECT DEP asdf2134 VW BALSERBRODIE",
      "Check_Number": "",
      "Category": "",
      "Tags": "",
      "Amount": "$3,000.68",
      "Balance": "$4,000.32"
    }
  ]

  const fortFinResult =  [
    {
      title: 'amazon mktpl*rv0sb16k0 amzn.com/bill wa',
      date: 1722312000000,
      category: '',
      type: 'withdraw',
      transaction: -31,
      balance: 801,
      source: 'FORT_FINANCIAL',
      stacks: []
    },
    {
      title: 'ach deposit bobs burger worl direct dep asdf2134 vw balserbrodie',
      date: 1719547200000,
      category: '',
      type: 'deposit',
      transaction: 3001,
      balance: 4000,
      source: 'FORT_FINANCIAL',
      stacks: []
    }
  ]

  it("return normale transaction", () => {
    const result = normalizeTransactions(TransSources.FORT_FINANCIAL, fortFinInput)
    expect(result).toEqual(fortFinResult)
  })
})
