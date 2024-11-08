import { Income } from "./types/income";
import { Stacks } from "./types/stacks";

const defaultStacks: Stacks = {
  Mortgage: {
    name: "Mortgage",
    components: {
      keywords: [],
      transactions: []
    },
    coins: 0,
    depositCadence: {
      type: "exact",
      incidence: "bi-weekly",
      amount: 0,
      importanceLevel: 1,
      lastUpdated: 1722484800000
    },
    group: "House"
  },
  Utilities: {
    name: "Utilities",
    components: {
      keywords: [],
      transactions: []
    },
    coins: 0,
    depositCadence: {
      type: "percent",
      incidence: "bi-weekly",
      amount: 0,
      importanceLevel: 2,
      lastUpdated: 1722484800000
    },
    group: "House"
  },
  Food: {
    name: "Food",
    components: {
      keywords: [],
      transactions: []
    },
    coins: 0,
    depositCadence: {
      type: "percent",
      incidence: "bi-weekly",
      amount: 0,
      importanceLevel: 3,
      lastUpdated: 1722484800000
    },
    group: "Family"
  },
  EmergencyFund: {
    name: "Emergency Fund",
    components: {
      keywords: [],
      transactions: []
    },
    coins: 0,
    depositCadence: {
      type: "percent",
      incidence: "bi-weekly",
      amount: 0,
      importanceLevel: 4,
      lastUpdated: 1722484800000
    },
    group: "House"
  },
  Subscriptions: {
    name: "Subscriptions",
    components: {
      keywords: [],
      transactions: []
    },
    coins: 0,
    depositCadence: {
      type: "percent",
      incidence: "bi-weekly",
      amount: 0,
      importanceLevel: 5,
      lastUpdated: 1722484800000
    },
    group: "House"
  },
  FamilyCoin: {
    name: "Family Coin",
    components: {
      keywords: [],
      transactions: []
    },
    coins: 0,
    depositCadence: {
      type: "percent",
      incidence: "bi-weekly",
      amount: 0,
      importanceLevel: 6,
      lastUpdated: 1722484800000
    },
    group: "Family"
  }
}

const defaultIncome: Income = {
  coins: 0,
  keyword: 'income key word'
}

export {
  defaultStacks,
  defaultIncome
}
