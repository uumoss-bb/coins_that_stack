import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { Stacks, StacksFile, StacksLastUpdated } from "../../shared/types/stacks"

const updateStacksFile = (newData: Stacks|StacksLastUpdated|StacksFile) => {
  const { error, data} = FileSystem.updatePersonalFile(STACK_FILE_NAME, newData)
  if(error) {
    throw new Error("Failed to update stacks")
  }
  return data as StacksFile
}

export default updateStacksFile
