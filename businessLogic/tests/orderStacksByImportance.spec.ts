import { Stack, Stacks, StacksArray } from "../../shared/types/stacks";
import orderStacksByImportance from "../orderStacksByImportance";

const stack1: Stack = {
  "name": "Test1",
  "keywords": [],
  "transactions": [],
  "coins": 100,
  "deposit": {
    "type": "percent",
    "incidence": "weekly",
    "amount": 10,
    "importanceLevel": 1,
    "lastUpdated": 0
  },
  "group": "House"
}

const stack2: Stack = {
  "name": "Test2",
  "keywords": [],
  "transactions": [],
  "coins": 100,
  "deposit": {
    "type": "percent",
    "incidence": "weekly",
    "amount": 10,
    "importanceLevel": 2,
    "lastUpdated": 0
  },
  "group": "House"
}

const stack3: Stack = {
  "name": "Test3",
  "keywords": [],
  "transactions": [],
  "coins": 100,
  "deposit": {
    "type": "percent",
    "incidence": "weekly",
    "amount": 10,
    "importanceLevel": 3,
    "lastUpdated": 0
  },
  "group": "House"
}

const stack4: Stack = {
  "name": "Test4",
  "keywords": [],
  "transactions": [],
  "coins": 100,
  "deposit": {
    "type": "percent",
    "incidence": "weekly",
    "amount": 10,
    "importanceLevel": 4,
    "lastUpdated": 0
  },
  "group": "House"
}

const unorderedStacks: Stacks = {
  [stack4.name]: stack4,
  [stack2.name]: stack2,
  [stack1.name]: stack1,
  [stack3.name]: stack3
}

const orderedStacks: StacksArray = [
  stack1,
  stack2,
  stack3,
  stack4
]

describe('orderStackByImportance', () => {
  it('reorder Stacks by ascending oder base on importanceLevel', () => {
    const result = orderStacksByImportance(unorderedStacks)
    expect(result).toStrictEqual(orderedStacks)
  })
})
