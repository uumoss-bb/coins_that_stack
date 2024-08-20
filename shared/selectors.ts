
const selectTransWithNoStacks = (trans: { stacks: [] }) => !trans.stacks.length

const selectTruthyItems = (item: unknown) => !!item

export {
  selectTruthyItems,
  selectTransWithNoStacks
}
