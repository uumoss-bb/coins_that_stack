
export const shallowCopy = (obj: object) => ({ ...obj })
export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj))
