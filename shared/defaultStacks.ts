import { Stacks } from "./types/stacks";

const defaultStacks: Stacks = {
  "Family Coin": {
      "name": "Amazon",
      "keywords": ["amazon"],
      "transactions": [],
      "coins": 0,
      "deposit": {
        type: 'percent',
        incidence: 'bi-weekly',
        amount: 10
      },
      "group": 'Family'
  },
  "Morgage": {
      "name": "House",
      "keywords": ["cooper"],
      "transactions": [],
      "coins": 0,
      "deposit": {
        type: 'exact',
        incidence: 'bi-weekly',
        amount: 2677
      },
      "group": 'Family'
  },
  "Food": {
      "name": "Food",
      "keywords": ["safeway", "costco", "kroger", "wall-mart", "meijer"],
      "transactions": [],
      "coins": 0,
      "deposit": {
        type: 'percent',
        incidence: 'bi-weekly',
        amount: 10
      },
      "group": 'Family'
  },
  "Utilities": {
      "name": "Utilities",
      "keywords": ["frontier", "fort wayne utili", "xcel", "aepindia", "celina", "nipsco"],
      "transactions": [],
      "coins": 0,
      "deposit": {
        type: 'percent',
        incidence: 'bi-weekly',
        amount: 10
      },
      "group": 'Family'
  },
  "Subscriptions": {
      "name": "Subscriptions",
      "keywords": ["audible", "lee brothers", "spotify", "dropbox", "prime", "ring", "disney plus", "netflix", "lastpass"],
      "transactions": [],
      "coins": 0,
      "deposit": {
        type: 'percent',
        incidence: 'bi-weekly',
        amount: 10
      },
      "group": 'Family'
  }
}

export default defaultStacks
