import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { getExchangeRates } from '@/services/http'
import { getFormattedDate } from '@/utils/date'

export function useExchangeRates(date = ref(new Date())) {
  const formattedDate = computed(() => getFormattedDate(date.value))

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['exchange-rates', formattedDate],
    queryFn: async () => getExchangeRates(formattedDate.value),
  })

  return {
    isPending,
    isFetching,
    isError,
    data,
    error,
  }
}
