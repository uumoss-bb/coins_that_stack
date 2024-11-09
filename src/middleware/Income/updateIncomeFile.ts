import FileSystem from "../../backend/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import { Income } from "../../shared/types/income"


function updateIncomeFile(newIncome: Income) {
  const { error, data } = FileSystem.updatePersonalFile(INCOME_FILE_NAME, newIncome)
  if(error) {
    throw new Error("Failed to set new income")
  }
  return data as Income
}

export default updateIncomeFile
