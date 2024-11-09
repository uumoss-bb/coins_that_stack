import { convertDate, prettyJSON } from "../shared/normalizers"
import { Transaction, Transactions } from "../shared/types/transactions"

const createMockTransactions = (count: number, startDate: string) => {
  const mockTransactions: Transactions = []
  for (let index = 0; index <= count; index++) {
    const milliStartDate = convertDate.milliseconds(startDate)
    const dayInMilli = 86400000
    const mockTransaction: Transaction = {
      title: 'burger king #4707 fort wayne in',
      date: milliStartDate + (dayInMilli * index),
      category: '',
      type: 'withdraw',
      transaction: -100,
      balance: 100000 - (100 * index),
      source: 'FORT_FINANCIAL',
      stacks: []
    }

    mockTransactions.push(mockTransaction)
  }

  console.log(prettyJSON(mockTransactions))
  return mockTransactions
}

it("log mockTransactions", () => {
  const count = 10
  const startDate = "April 16, 1995"
  createMockTransactions(count, startDate)
})
