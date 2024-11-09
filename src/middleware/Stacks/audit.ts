import { getIncomeFile } from "../Income";
import getStacks from "./getStacks";
import calculateLatestExpenses from "./calculateExpenses";
import calculatePayDay from "./calculatePayDay";

function audit() {
  const { coins } = getIncomeFile()
  const {
    latestStacks,
    stackedTransactions: latestStackedTransactions,
    nonStackedTransactions: latestFreeTransactions,
    deposits
  } = calculateLatestExpenses()// these are just expenses

  const { fatStacks, stackPayments } = calculatePayDay(coins, latestStacks)// these are the stacks being changed

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
