import { Stacks } from "./types/stacks";

const defaultStacks: Stacks = {
  "BB Owns": {
    "name": "BB Owns",
    "components": {
      "keywords": [
        "canyon"
      ],
      "transactions": []
    },
    "coins": 0,
    "depositCadence": {
      "type": "exact",
      "incidence": "bi-weekly",
      "amount": 0,
      "importanceLevel": null,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Mortgage": {
    "name": "Mortgage",
    "components": {
      "keywords": [
        "cooper"
      ],
      "transactions": []
    },
    "coins": 2627,
    "depositCadence": {
      "type": "exact",
      "incidence": "bi-weekly",
      "amount": 1314,
      "importanceLevel": 1,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Utilities": {
    "name": "Utilities",
    "components": {
      "keywords": [
        "frontier",
        "fort wayne utili",
        "xcel",
        "aepindia",
        "celina",
        "nipsco"
      ],
      "transactions": []
    },
    "coins": 786,
    "depositCadence": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 419,
      "importanceLevel": 2,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Food": {
    "name": "Food",
    "components": {
      "keywords": [
        "safeway",
        "costco",
        "kroger",
        "wall-mart",
        "meijer",
        "aldi"
      ],
      "transactions": []
    },
    "coins": 750,
    "depositCadence": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 750,
      "importanceLevel": 3,
      "lastUpdated": 1722484800000
    },
    "group": "Family"
  },
  "Emergency Fund": {
    "name": "Emergency Fund",
    "components": {
      "keywords": [],
      "transactions": []
    },
    "coins": 30608,
    "depositCadence": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 304,
      "importanceLevel": 4,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Subscriptions": {
    "name": "Subscriptions",
    "components": {
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
      "transactions": []
    },
    "coins": 344,
    "depositCadence": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 158,
      "importanceLevel": 5,
      "lastUpdated": 1722484800000
    },
    "group": "House"
  },
  "Family Coin": {
    "name": "Family Coin",
    "components": {
      "keywords": [
        "amazon",
        "menards",
        "hicksville sport",
        "masters heating & cooling",
        "bargain lane",
        "chelsea kelly"
      ],
      "transactions": []
    },
    "coins": 868,
    "depositCadence": {
      "type": "percent",
      "incidence": "bi-weekly",
      "amount": 17,
      "importanceLevel": 6,
      "lastUpdated": 1722484800000
    },
    "group": "Family"
  }
}




export default defaultStacks
