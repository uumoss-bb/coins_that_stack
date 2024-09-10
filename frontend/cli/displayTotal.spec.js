import _Stacks from '../../middleware/Stacks'

it("GET TOTAL", () => {
  const Stacks = new _Stacks()
  const { grandTotal, deposits, withdraws } = Stacks.summarizeTotal()
  console.table(grandTotal)
  console.table(deposits)
  console.table(withdraws)
})
