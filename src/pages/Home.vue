<script setup lang="ts">
import ExchangeRatesTable from '@/components/ExchangeRatesTable.vue'
import { useExchangeRates } from '@/composables/exchange-rates'
import { useErrorMessage } from '@/composables/use-error-message'
import { getFormattedDate } from '@/utils/date'

const { data, isPending, isError } = useExchangeRates()
useErrorMessage(isError)
const today = getFormattedDate(new Date(), '/')
</script>

<template>
  <h1>{{ $t("pages.home.title", { date: today }) }}</h1>
  <el-divider />
  <el-skeleton v-if="!data || isPending" :rows="10" animated :throttle="300" />
  <div v-else>
    <ExchangeRatesTable :data="data">
      <template #default>
        <el-table-column prop="currencyName" :label="$t('currency.name')" />
        <el-table-column prop="currencyCode" :label="$t('currency.code')" />
        <el-table-column
          prop="exchangeRate"
          :label="$t('currency.rate')"
          width="180"
        />
        <el-table-column
          prop="currencyCodeNumeric"
          :label="$t('currency.numericCode')"
        />
        <el-table-column
          prop="exchangeDate"
          :label="$t('currency.updateDate')"
        />
      </template>
      <template #actions="{ scope, edit }">
        <el-button type="warning" @click="edit(scope.row)">
          {{ $t("actions.edit") }}
        </el-button>
      </template>
    </ExchangeRatesTable>
  </div>
</template>

<style scoped></style>
