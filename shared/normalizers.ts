
const normalizeText = (text: string = 'missing text') => text.trim().toLowerCase()

const replaceSpacesWithUnderscores = (text: string = 'missing text') => text.replace(/\s+/g, '_');

export {
  replaceSpacesWithUnderscores,
  normalizeText
}
