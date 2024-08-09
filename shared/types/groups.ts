import { Transaction } from "./transactions"

export interface Group {
  name: string,
  keywords: string[]
  transactions: Transaction[],
  coins: number
}

export type Groups = {
  [key: string]: Group
}

export type GroupsArray = Group[]
