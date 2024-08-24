import FileSystem from "../database/FileSystem"
import { STACK_FILE_NAME } from "../shared/enums/fileNames"
import { Stack, Stacks } from "../shared/types/stacks"

class _Stacks {

  private stacks: Stacks

  constructor() {
    const { error, data: stackFile } = FileSystem.readJsonFile(STACK_FILE_NAME)
    if(error) {
      FileSystem.writeJsonFile(STACK_FILE_NAME, {})
      this.stacks = {}
    } else {
      this.stacks = stackFile as Stacks
    }
  }

  getStack(stackName: string) {
    return this.stacks[stackName]
  }

  updateStack(stack: Stack) {
    const { error, data: stackFile } = FileSystem.updateJsonFile(STACK_FILE_NAME, { [stack.name]: stack })
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.stacks = stackFile as Stacks
  }

  getStacks() {
    return this.stacks
  }

  updateStacks(stacks: Stack) {
    const { error, data: stackFile } = FileSystem.updateJsonFile(STACK_FILE_NAME, { ...stacks })
    if(error) {
      throw new Error("Failed to set new income")
    }
    this.stacks = stackFile as Stacks
  }
}

export default _Stacks
