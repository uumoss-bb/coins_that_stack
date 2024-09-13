
export interface Income {
  coins: number
  keyword: string
}

export type DepositTypes = 'percent' | 'exact'

export type DepositIncidences = 'bi-weekly' | 'weekly'

export interface DepositCadence {
  type: DepositTypes,
  amount: number,
  incidence: DepositIncidences,
  lastUpdated: number,
  importanceLevel: number | null
}
