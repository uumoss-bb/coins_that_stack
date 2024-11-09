import { WEEK_MS } from '../../shared/enums/time';
import { DepositCadence } from '../../shared/types/income';
import { Stack } from '../../shared/types/stacks';
import addCoinsToStacks from '../addCoinsToStacks';

const coins = 1000
const baseStackCoins = 2000
const stack: Stack = {
  name: 'TestA',
  components: {keywords: [], transactions: []},
  coins: baseStackCoins,
}

describe('addCoinsToStacks', () => {
  it('add coins to stacks with type percentage and exact', () => {
    const depositWithPercentage: DepositCadence = {
      type: 'percent',
      incidence: 'weekly',
      amount: 10,
      importanceLevel: 1,
      lastUpdated: Date.now() - (WEEK_MS * 2)
    }
    const stackWithPercentage: Stack = {
      ...stack,
      depositCadence: depositWithPercentage
    }

    const depositWithExact: DepositCadence = {
      type: 'exact',
      incidence: 'weekly',
      amount: 200,
      importanceLevel: 2,
      lastUpdated: Date.now() - (WEEK_MS * 2)
    }
    const stackWithExact: Stack = {
      ...stack,
      depositCadence: depositWithExact
    }

    const result = addCoinsToStacks(coins, [stackWithPercentage, stackWithExact])
    expect(result.fatStacks[0].coins).toBe(2100)
    expect(result.fatStacks[1].coins).toBe(2200)
  })

  it('add coins to stacks with incidence bi-weekly and are ready to be updated', () => {

    const depositThatsReady: DepositCadence = {
      type: 'percent',
      incidence: 'bi-weekly',
      amount: 10,
      importanceLevel: 1,
      lastUpdated: Date.now() - (WEEK_MS * 3)
    }
    const stackThatsReady: Stack = {
      ...stack,
      depositCadence: depositThatsReady
    }


    const depositThatsNotRead: DepositCadence = {
      type: 'exact',
      incidence: 'bi-weekly',
      amount: 200,
      importanceLevel: 2,
      lastUpdated: Date.now() - WEEK_MS
    }
    const stackThatsNotRead: Stack = {
      ...stack,
      depositCadence: depositThatsNotRead
    }

    const result = addCoinsToStacks(coins, [stackThatsReady, stackThatsNotRead])
    expect(result.fatStacks[0].coins).toBe(2100)
    expect(result.fatStacks[1].coins).toBe(2000)
  })
})
