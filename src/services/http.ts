const API_URL = import.meta.env.VITE_API_URL

type GetExchangeRatesResponse = {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

export type ExchangeRate = {
  currencyCodeNumeric: number
  currencyName: string
  exchangeRate: number
  currencyCode: string
  exchangeDate: string
}

function transformGetExchangeRatesResponse(data: GetExchangeRatesResponse[]): ExchangeRate[] {
  return data.map(item => ({
    currencyCodeNumeric: item.r030,
    currencyName: item.txt,
    exchangeRate: item.rate,
    currencyCode: item.cc,
    exchangeDate: item.exchangedate,
  }))
}

export async function getExchangeRates(date: string): Promise<ExchangeRate[]> {
  const params = new URLSearchParams({ date }).toString()
  const url = `${API_URL}?${params}&json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`error fetching exchange rates: ${response.statusText}`)
  }

  const data = await response.json() as GetExchangeRatesResponse[]

  return transformGetExchangeRatesResponse(data)
}
