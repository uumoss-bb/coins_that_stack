import FileSystem from "../../database/FileSystem"
import { STACK_FILE_NAME } from "../../shared/enums/fileNames"
import { convertDate } from "../../shared/normalizers"
import { Stacks, StacksFile } from "../../shared/types/stacks"

function updateFile(newData: object) {
  const { error, data} = FileSystem.updateJsonFile(STACK_FILE_NAME, newData)
  if(error) {
    throw new Error("Failed to update stacks")
  }
  return data as StacksFile
}

const updateStacksFile = (data: Stacks|string) => {
  if(typeof data === 'string') {
    const lastUpdated = convertDate.milliseconds(data)
    return updateFile({ lastUpdated })
  }

  return updateFile(data)
}

export default updateStacksFile
