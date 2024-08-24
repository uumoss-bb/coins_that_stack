import summarizeTotal from '../../middleware/summarizeTotal_cli'

it("GET TOTAL", () => {
  const { grandTotal, deposits, withdraws } = summarizeTotal()
  console.table(grandTotal)
  console.table(deposits)
  console.table(withdraws)
})
