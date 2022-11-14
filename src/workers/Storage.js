const Storage = {
  post: ({key, value}) => localStorage.setItem(key, JSON.stringify(value)),

  getAll() {
    const storageKeys = Object.keys(localStorage)
    const items = []
   
    storageKeys.forEach(key => {
      const item = JSON.parse(localStorage.getItem(key))
      items.push(item)
    })
    
    return items
  },

  delete: ({key}) => localStorage.removeItem(key)
}

export default Storage