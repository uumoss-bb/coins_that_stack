import FileSystem from "../database/FileSystem"

class _Income {

  private coins: number
  private incomeFileName = 'income'

  constructor(coins: number) {
    this.coins = coins
  }

  getCoins() {
    return this.coins
  }

  setCoins(coins: number) {
    const { error } = FileSystem.updateJsonFile(this.incomeFileName, { coins })
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.coins = coins
  }

  getStackAllocations() {
    //TODO: I want to know what percentage each stack is pulling from Income
  }
}

export default _Income
