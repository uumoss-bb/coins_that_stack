import { convertDate } from '../../shared/normalizers'
import filterTransactionsByDate from '../filterTransactionsByDate'

const mockTransactions = [
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798008400000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 100000,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798094800000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99900,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798181200000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99800,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798267600000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99700,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798354000000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99600,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798440400000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99500,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798526800000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99400,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798613200000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99300,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798699600000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99200,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798786000000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99100,
    "source": "FORT_FINANCIAL",
    "stacks": []
  },
  {
    "title": "burger king #4707 fort wayne in",
    "date": 798872400000,
    "category": "",
    "type": "withdraw",
    "transaction": -100,
    "balance": 99000,
    "source": "FORT_FINANCIAL",
    "stacks": []
  }
]

const startDate = "April 16, 1995"
const endDate = "April 20, 1995"

describe("Filter Transactions By Date", () => {
  it("return all transactions in between start and end date", () => {
    const transactions = filterTransactionsByDate(mockTransactions, startDate, endDate)
    expect(transactions[0].date).toBe(convertDate.milliseconds(startDate))
    expect(transactions[transactions.length - 1].date).toBe(convertDate.milliseconds(endDate))

  })

  it("return all transactions greater than or equal to start date", () => {
    const transactions = filterTransactionsByDate(mockTransactions, startDate, null)
    expect(transactions[0].date).toBe(convertDate.milliseconds(startDate))
    expect(transactions[transactions.length - 1].date).toBe(mockTransactions[mockTransactions.length - 1].date)
  })

  it("return all transactions less than or equal to end date", () => {
    const transactions = filterTransactionsByDate(mockTransactions, null, endDate)
    expect(transactions[0].date).toBe(mockTransactions[0].date)
    expect(transactions[transactions.length - 1].date).toBe(convertDate.milliseconds(endDate))
  })
})
