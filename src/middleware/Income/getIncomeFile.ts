import FileSystem from "../../backend/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import { Income } from "../../shared/types/income"

const getIncomeFile = () => {
  const { error, data } = FileSystem.readPersonalFile(INCOME_FILE_NAME)
  if(error) {
    throw new Error('Failed to get stacks file')
  } else {
    return data as Income
  }
}

export default getIncomeFile
