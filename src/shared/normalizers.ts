
const dateOptions: any = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: "2-digit",
};

const normalizeText = (text: string = 'missing text') => text.trim().toLowerCase()

const replaceSpacesWithUnderscores = (text: string = 'missing text') => text.replace(/\s+/g, '_');

const convertDate = {
  'milliseconds': (date: string) => new Date(date).getTime(),
  'full': (date: number) => new Date(date).toLocaleDateString('en-us', dateOptions)
}

const prettyJSON = (data: object) => JSON.stringify(data, null, 2)

const formatToCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  });
}

export {
  replaceSpacesWithUnderscores,
  normalizeText,
  convertDate,
  prettyJSON,
  formatToCurrency
}
