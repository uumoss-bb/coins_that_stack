import { DepositCadence } from "./income"
import { Transactions } from "./transactions"

export interface Stack {
  name: string
  coins: number
  components: StackComponents,
  depositCadence?: DepositCadence
  group?: string
}

export type StacksLastUpdated = { lastUpdated: number }

export type Stacks = { [key: string]: Stack; }

export type StacksFile = Stacks & StacksLastUpdated;

export type StacksArray = Stack[]

export type StackComponents = {
  keywords: string[]
  transactions: Transactions,
  coins?: number
}

export type StackPayments = { [key in string]: number }
