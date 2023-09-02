import {
  capitalone,
  elevations,
  // venmo,
  // paypal
} from '../../transactions'

const currentDefault = {
  "Dog Food": {
    "name": "Dog Food",
    "keywords": ["POUDRE PET"]
  },
  "Amazon": {
    "name": "Amazon",
    "keywords": ["AMZN"]
  },
  "Gas": {
    "name": "Gas",
    "keywords": ["Gas/Automotive"]
  },
  "Rent": {
    "name": "Rent",
    "keywords": ["HelixProperty"]
  },
  "Food": {
    "name": "Food",
    "keywords": ["safeway", "kroger", "king soopers", "WAL-MART"]
  },
  "Utilities": {
    "name": "Utilities",
    "keywords": ["CONNEXION", "FORTCOLUTILITIES", "XCEL"]
  },
  "GrubHub ": {
    "name": "GrubHub ",
    "keywords": ["GRUBHUB"]
  },
  "Cigars": {
    "name": "Cigars",
    "keywords": ["Cigar Shop", "Edwards Pipe & Cigar S", "SMOLDER LOUNGE"]
  },
  "Subscriptions": {
    "name": "Subscriptions",
    "keywords": ["audible", "MCMAHON", "LEMONADE", "SPOTIFY", "USCCA", "Dropbox", "CHATGPT", "LEGALSHIELD", "Prime Video"]
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
    this.post('groups', currentDefault)
  }
  if(!transactions){
    console.log('DEFAULT TRANSACTIONS')
    this.post('transactions', [
      ...capitalone,
      ...elevations
    ])
  }
}

const LocalStore = {
  setDefault,
  post,
  getAll,
  remove
}

export default LocalStore
