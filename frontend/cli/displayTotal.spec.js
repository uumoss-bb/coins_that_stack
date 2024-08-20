import getTotal from '../../middleWare/toFrontEnd/getTotal_cli'

it("GET TOTAL", () => {
  const { grandTotal, deposits, withdraws } = getTotal()
  console.table(grandTotal)
  console.table(deposits)
  console.table(withdraws)
})
