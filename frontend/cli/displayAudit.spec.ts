import { audit } from '../../middleware/Stacks'
import { Transactions } from '../../shared/types/transactions'
import { convertDate } from '../../shared/normalizers'
import sortTransactions from '../../businessLogic/sortTransactions'
import { StacksArray } from '../../shared/types/stacks'

const normalizeTransactions = (transactions: Transactions) =>
  transactions.map(({title, date, coins, stacks}) => ({title, date: convertDate.full(date), coins, stacks}))

const normalizeStacks = (fatStacks: StacksArray) =>
  fatStacks.map(stack => {
    return {
      name: stack.name,
      coins: stack.coins
    }
  })

it("AUDIT", () => {
  const {
    latestStacks,
    latestStackChanges,
    latestFreeTransactions,
    latestStackedTransactions,
    fatStacks
  } = audit()
  const transactions = sortTransactions([...latestStackedTransactions, ...latestFreeTransactions], 'stack')

  console.log("NEW STACK CHANGES")
  console.table(latestStackChanges)

  console.log("TRANSACTIONS")
  console.table(normalizeTransactions(transactions))

  console.log("FAT STACKS")
  console.table(normalizeStacks(fatStacks))
})
