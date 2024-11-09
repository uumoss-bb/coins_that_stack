import { getIncomeFile } from "../Income";
import calculateLatestExpenses from "./calculateExpenses";
import calculatePayDay from "./calculatePayDay";

function audit() {
  const { coins } = getIncomeFile()//This process need to get all the deposits
  const {
    latestStacks,
    stackedTransactions: latestStackedTransactions,
    nonStackedTransactions: latestFreeTransactions,
    deposits
  } = calculateLatestExpenses()

  const { fatStacks, stackPayments } = calculatePayDay(coins, latestStacks)

  return {
    latestStacks,
    latestStackedTransactions,
    latestFreeTransactions,
    deposits,
    fatStacks,
    stackPayments
  }
}

export default audit
