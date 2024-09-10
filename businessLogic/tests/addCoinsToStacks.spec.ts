import { WEEK_MS } from "../../shared/enums/time";
import { Stack } from "../../shared/types/stacks";
import addCoinsToStacks from "../addCoinsToStacks";

const coins = 1000
const baseStackCoins = 2000

describe('addCoinsToStacks', () => {
  it('add coins to stacks with type percentage and exact', () => {
    const stackWithPercentage: Stack = {
      "name": "TestA",
      "keywords": [],
      "transactions": [],
      "coins": baseStackCoins,
      "deposit": {
        "type": "percent",
        "incidence": "weekly",
        "amount": 10,
        "importanceLevel": 1,
        "lastUpdated": Date.now() - (WEEK_MS * 2)
      },
      "group": "House"
    }

    const stackWithExact: Stack = {
      "name": "TestB",
      "keywords": [],
      "transactions": [],
      "coins": baseStackCoins,
      "deposit": {
        "type": "exact",
        "incidence": "weekly",
        "amount": 200,
        "importanceLevel": 2,
        "lastUpdated": Date.now() - (WEEK_MS * 2)
      },
      "group": "House"
    }
    const result = addCoinsToStacks(coins, [stackWithPercentage, stackWithExact])
    expect(result[0].coins).toBe(2100)
    expect(result[1].coins).toBe(2200)
  })

  it('add coins to stacks with incidence bi-weekly and are ready to be updated', () => {
    const stackThatsReady: Stack = {
      "name": "TestA",
      "keywords": [],
      "transactions": [],
      "coins": baseStackCoins,
      "deposit": {
        "type": "percent",
        "incidence": "bi-weekly",
        "amount": 10,
        "importanceLevel": 1,
        "lastUpdated": Date.now() - (WEEK_MS * 3)
      },
      "group": "House"
    }

    const stackThatsNotRead: Stack = {
      "name": "TestB",
      "keywords": [],
      "transactions": [],
      "coins": baseStackCoins,
      "deposit": {
        "type": "exact",
        "incidence": "bi-weekly",
        "amount": 200,
        "importanceLevel": 2,
        "lastUpdated": Date.now() - WEEK_MS
      },
      "group": "House"
    }
    const result = addCoinsToStacks(coins, [stackThatsReady, stackThatsNotRead])
    expect(result[0].coins).toBe(2100)
    expect(result[1].coins).toBe(2000)
  })
})
