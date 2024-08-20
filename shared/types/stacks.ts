import { Transaction } from "./transactions"

export interface Stack {
  name: string,
  keywords: string[]
  transactions: Transaction[],
  coins: number
}

export type Stacks = {
  [key: string]: Stack
}

export type StacksArray = Stack[]
