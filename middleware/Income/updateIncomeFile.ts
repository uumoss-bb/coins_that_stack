import FileSystem from "../../database/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import DepositCadence from "../../shared/types/income"


function updateIncomeFile(newIncome: DepositCadence) {
  const { error, data } = FileSystem.updateJsonFile(INCOME_FILE_NAME, newIncome)
  if(error) {
    throw new Error("Failed to set new income")
  }
  return data as DepositCadence
}

export default updateIncomeFile
