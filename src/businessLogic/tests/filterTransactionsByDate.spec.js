import filterTransactionsByDate from '../filterTransactionsByDate'

const mockTransactions = [
  {
    "title": "burger king #4707 fort wayne in",
    "date": new Date("April 1, 1995").getTime(),
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 100000,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": new Date("April 16, 1995").getTime(),
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99900,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": new Date("April 18, 1995").getTime(),
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99800,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": new Date("April 20, 1995").getTime(),
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99200,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": new Date("April 22, 1995").getTime(),
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99100,
    "source": "FORT_FINANCIAL",
    "stacks": []
  }
]

const startDate = "April 16, 1995"
const endDate = "April 20, 1995"

//NOTE: this function does not sort them.

describe("Filter Transactions By Date", () => {
  it("return all transactions in between start and end date", () => {
    const transactions = filterTransactionsByDate(mockTransactions, startDate, endDate)
    expect(transactions.length).toBe(3)
    expect(transactions[0].date).toBe(mockTransactions[1].date)
    expect(transactions[1].date).toBe(mockTransactions[2].date)
    expect(transactions[2].date).toBe(mockTransactions[3].date)
  })

  it("return all transactions later than or equal to start date", () => {
    const transactions = filterTransactionsByDate(mockTransactions, startDate, null)
    expect(transactions.length).toBe(4)
    expect(transactions[0].date).toBe(mockTransactions[1].date)
    expect(transactions[1].date).toBe(mockTransactions[2].date)
    expect(transactions[2].date).toBe(mockTransactions[3].date)
    expect(transactions[3].date).toBe(mockTransactions[4].date)
  })

  it("return all transactions Earlier than or equal to end date", () => {
    const transactions = filterTransactionsByDate(mockTransactions, null, endDate)
    expect(transactions.length).toBe(4)
    expect(transactions[0].date).toBe(mockTransactions[0].date)
    expect(transactions[1].date).toBe(mockTransactions[1].date)
    expect(transactions[2].date).toBe(mockTransactions[2].date)
    expect(transactions[3].date).toBe(mockTransactions[3].date)
  })
})
