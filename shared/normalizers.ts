
type DateConverterTypes = 'milliseconds' | 'full'
type DateConverters = { [key in DateConverterTypes]: () => string | number }

const normalizeText = (text: string = 'missing text') => text.trim().toLowerCase()

const replaceSpacesWithUnderscores = (text: string = 'missing text') => text.replace(/\s+/g, '_');

const convertDate = (date: string, type: DateConverterTypes) => {
  const options: any = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: "2-digit",
  };

  const dateConverters: DateConverters = {
    'milliseconds': () => new Date(date).getTime(),
    'full': () => new Date(date).toLocaleDateString('en-us', options)
  }

  return dateConverters[type]()
}


export {
  replaceSpacesWithUnderscores,
  normalizeText,
  convertDate
}
