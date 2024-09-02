import { Transaction } from "./transactions"

export interface Stack {
  name: string,
  keywords: string[]
  transactions: Transaction[],
  coins: number
  deposit: {
    type: DepositTypes,
    amount: number,
    incidence: StackIncidences,
    lastUpdated: number,
    importanceLevel: number | null
  }
  group?: string
}

export type DepositTypes = 'percent' | 'exact'

export type StackIncidences = 'bi-weekly' | 'weekly'

export type StacksLastUpdated = { lastUpdated: number }

export type Stacks = { [key: string]: Stack; }

export type StacksFile = Stacks & StacksLastUpdated;

export type StacksArray = Stack[]
