import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { Stacks, StacksFile } from "../../shared/types/stacks"

const getStackFile = () => {
  const { error, data: stackFile } = FileSystem.readJsonFile(STACK_FILE_NAME)
  if(error) {
    throw new Error("Stacks Init failed to get stacks file")
  } else {
    return stackFile as StacksFile
  }
}

const getStacks = (): { lastUpdated: number, stacks: Stacks } => {
  const { lastUpdated, ...stacks } = getStackFile()
  return {
    lastUpdated,
    stacks
  }
}

export default getStacks
