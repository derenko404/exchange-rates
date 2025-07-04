import type { CustomExchangeRate } from '@/services/storage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  deleteCustomExchangeRate,
  getCustomExchangeRates,
  saveCustomExchangeRate,
} from '@/services/storage'

const KEY = ['custom-exchange-rates']

export function useCustomExchangeRates() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => getCustomExchangeRates(),
  })
}

export function useDeleteCustomExchangeRate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      currencyCode,
    }: Pick<CustomExchangeRate, 'currencyCode'>) => {
      deleteCustomExchangeRate(currencyCode)
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: KEY })
    },
  })
}

export function useSaveCustomExchangeRate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: CustomExchangeRate) => {
      saveCustomExchangeRate(variables)
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: KEY })
    },
  })
}
