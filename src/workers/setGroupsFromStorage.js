import Storage from "./Storage"

const setGroupsFromStorage = () => {
  const storedGroups = Storage.getAll()
  
  return storedGroups.reduce((groups, group) => ({
    ...groups,
    [group.name] : group
  }), {})
}

export default setGroupsFromStorage