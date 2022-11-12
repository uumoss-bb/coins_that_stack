const Storage = {
  post({key, value}) {
    console.log({key, value: JSON.stringify(value)})
    localStorage.setItem(key, JSON.stringify(value))
    console.log(this.getAll())
  },

  getAll() {
    const storageKeys = Object.keys(localStorage)
    const items = []
   
    storageKeys.forEach(key => {
      const item = JSON.parse(localStorage.getItem(key))
      items.push(item)
    })
    
    return items
  },

  delete({key}) {
    localStorage.removeItem(key)
    console.log("successfully deleted", key)
  }
}

export default Storage