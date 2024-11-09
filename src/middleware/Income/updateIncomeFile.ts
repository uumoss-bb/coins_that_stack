import FileSystem from "../../backend/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import { DepositCadence } from "../../shared/types/income"


function updateIncomeFile(newIncome: DepositCadence) {
  const { error, data } = FileSystem.updatePersonalFile(INCOME_FILE_NAME, newIncome)
  if(error) {
    throw new Error("Failed to set new income")
  }
  return data as DepositCadence
}

export default updateIncomeFile
