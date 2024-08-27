import defaultStacks from '../shared/defaultStacks'

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
  const { stacks, transactions } = this.getAll()

  if(!stacks){
    this.post('stacks', defaultStacks)
  }
  if(!transactions){
    this.post('transactions', [])
  }
}

const get = (key) => {
  const data = localStorage.getItem(key)
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
