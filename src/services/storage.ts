import type { ExchangeRate } from './http'

export type CustomExchangeRate = Omit<ExchangeRate, 'exchangeDate'>

const STORAGE_KEY = 'customExchangeRates'

export function getCustomExchangeRates() {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]',
  ) as CustomExchangeRate[]
}

export function saveCustomExchangeRate(rate: CustomExchangeRate) {
  const existingRates = getCustomExchangeRates().filter(
    r => r.currencyCode !== rate.currencyCode,
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingRates, rate]))
}

export function deleteCustomExchangeRate(currencyCode: CustomExchangeRate['currencyCode']) {
  const existingRates = getCustomExchangeRates()

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      existingRates.filter(item => item.currencyCode !== currencyCode),
    ),
  )
}
