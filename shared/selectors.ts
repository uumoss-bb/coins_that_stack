
const selectTransWithNoGroups = (trans: { groups: [] }) => !trans.groups.length

const selectTruthyItems = (item: unknown) => !!item

export {
  selectTruthyItems,
  selectTransWithNoGroups
}
