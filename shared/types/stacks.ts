import { Transaction } from "./transactions"

export interface Stack {
  name: string,
  keywords: string[]
  transactions: Transaction[],
  coins: number
  deposit: {
    type: 'percent' | 'exact',
    amount: number,
    incidence: 'monthly' | 'bi-weekly' | 'weekly' | 'daily'
  }
  group?: string
}

export type StacksLastUpdated = { lastUpdated: number }

export type Stacks = { [key: string]: Stack; }

export type StacksFile = Stacks & StacksLastUpdated;

export type StacksArray = Stack[]
