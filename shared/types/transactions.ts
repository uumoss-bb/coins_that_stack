
export type TransType = 'deposit' | 'withdraw'

export type TransSourceNames = 'FORT_FINANCIAL'

export type TransSourceObj = { [key: string]: TransSourceNames }

export interface FortFinTrans   {
  Account_ID: string,
  Transaction_ID: string,
  Date: string,
  Description: string,
  Check_Number: string,
  Category: string,
  Tags: string,
  Amount: string,
  Balance: string
}

export type DirtyTransactions = FortFinTrans[]

export interface Transaction   {
  title: string,
  date: number,
  category: string,
  type: TransType
  transaction: number,
  balance: number,
  source: TransSourceNames,
  stacks: string[]
}

export type Transactions = Transaction[]
