import FileSystem from "../../database/FileSystem"
import { INCOME_FILE_NAME } from "../../shared/enums/fileNames"
import DepositCadence from "../../shared/types/income"

function getIncomeFile() {
  const { error, data } = FileSystem.readJsonFile(INCOME_FILE_NAME)
  if(error) {
    throw new Error("Income Init failed to get file")
  } else {
    return data as DepositCadence
  }
}

const getIncome = () => {
  return getIncomeFile()
}

export default getIncome
