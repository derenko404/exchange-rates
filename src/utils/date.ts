export function getFormattedDate(date: Date, separator = '') {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}${separator}${month}${separator}${day}`
}

export function isDateAfterToday(date: Date) {
  return date.getTime() > Date.now()
}
