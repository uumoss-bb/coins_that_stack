import {
  capitalone,
  elevations,
  // venmo,
  // paypal
} from '../../transactions'

const currentDefault = {
  "Dog Food": {
    "name": "Dog Food",
    "keywords": ["POUDRE PET"],
    transactions: [], coinsSpent: 0
  },
  "Amazon": {
    "name": "Amazon",
    "keywords": ["AMZN"],
    transactions: [], coinsSpent: 0
  },
  "Gas": {
    "name": "Gas",
    "keywords": ["Gas/Automotive"],
    transactions: [], coinsSpent: 0
  },
  "Rent": {
    "name": "Rent",
    "keywords": ["HelixProperty"],
    transactions: [], coinsSpent: 0
  },
  "Food": {
    "name": "Food",
    "keywords": ["safeway", "kroger", "king soopers", "WAL-MART"],
    transactions: [], coinsSpent: 0
  },
  "Utilities": {
    "name": "Utilities",
    "keywords": ["CONNEXION", "FORTCOLUTILITIES", "XCEL"],
    transactions: [], coinsSpent: 0
  },
  "GrubHub ": {
    "name": "GrubHub ",
    "keywords": ["GRUBHUB"],
    transactions: [], coinsSpent: 0
  },
  "Cigars": {
    "name": "Cigars",
    "keywords": ["Cigar Shop", "Edwards Pipe & Cigar S", "SMOLDER LOUNGE"],
    transactions: [], coinsSpent: 0
  },
  "Subscriptions": {
    "name": "Subscriptions",
    "keywords": ["audible", "MCMAHON", "LEMONADE", "SPOTIFY", "USCCA", "Dropbox", "CHATGPT", "LEGALSHIELD", "Prime Video"],
    transactions: [], coinsSpent: 0
  }
}

const post = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const remove = (key) => localStorage.removeItem(key)

const getAll = function() {
  const storageKeys = Object.keys(localStorage)
  const items = {}
 
  storageKeys.forEach(key => {
    const item = JSON.parse(localStorage.getItem(key))
    items[key] = item
  })
  
  return items
}

const setDefault = function() {
  const { groups, transactions } = this.getAll()

  if(!groups){
    console.log('DEFAULT GROUPS')
    this.post('groups', [])
  }
  if(!transactions){
    console.log('DEFAULT TRANSACTIONS')
    this.post('transactions', [
      ...capitalone,
      ...elevations
    ])
  }
}

const get = (key) => {
  const data = localStorage.get(key)
  if(data) {
    return JSON.parse(data)
  }
}

const LocalStore = {
  setDefault,
  post,
  getAll,
  get,
  remove
}

export default LocalStore
