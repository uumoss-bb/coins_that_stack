import { Stacks } from "./types/stacks";

const defaultStacks: Stacks = {
  "Family Coin": {
    "name": "Family Coin",
    "keywords": [
      "amazon"
    ],
    "transactions": [],
    "coins": 868,
    "deposit": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 17,
      "importanceLevel": 6,
      "lastUpdated": 1722484800000
    },
    "group": "Family"
  },
  "Morgage": {
    "name": "Morgage",
    "keywords": [
      "cooper"
    ],
    "transactions": [],
    "coins": 2627,
    "deposit": {
      "type": "exact",
      "incidence": "bi-weekly",
      "amount": 1314,
      "importanceLevel": 1,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Food": {
    "name": "Food",
    "keywords": [
      "safeway",
      "costco",
      "kroger",
      "wall-mart",
      "meijer"
    ],
    "transactions": [],
    "coins": 750,
    "deposit": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 750,
      "importanceLevel": 3,
      "lastUpdated": 1722484800000
    },
    "group": "Family"
  },
  "Utilities": {
    "name": "Utilities",
    "keywords": [
      "frontier",
      "fort wayne utili",
      "xcel",
      "aepindia",
      "celina",
      "nipsco"
    ],
    "transactions": [],
    "coins": 786,
    "deposit": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 419,
      "importanceLevel": 2,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Subscriptions": {
    "name": "Subscriptions",
    "keywords": [
      "audible",
      "lee brothers",
      "spotify",
      "dropbox",
      "prime",
      "ring",
      "disney plus",
      "netflix",
      "lastpass"
    ],
    "transactions": [],
    "coins": 344,
    "deposit": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 158,
      "importanceLevel": 5,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Emergency Fund": {
    "name": "Emergency Fund",
    "keywords": [],
    "transactions": [],
    "coins": 30608,
    "deposit": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 304,
      "importanceLevel": 4,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  }
}



export default defaultStacks
