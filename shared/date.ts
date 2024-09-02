
const dateOptions: any = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: "2-digit",
};

export const WEEK_MS =  604800000

const convertDate = {
  'milliseconds': (date: string) => new Date(date).getTime(),
  'full': (date: number) => new Date(date).toLocaleDateString('en-us', dateOptions)
}
