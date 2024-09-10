
export const shallowCopy = (obj: object) => ({ ...obj })
export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj))

export function checkObjectType(input: object): string {
  if (Array.isArray(input)) {
    return 'array';
  }
  return 'object'
}
