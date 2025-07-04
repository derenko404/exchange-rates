<script setup lang="ts">
import { ref } from 'vue'
import ExchangeRatesTable from '@/components/ExchangeRatesTable.vue'
import { useExchangeRates } from '@/composables/exchange-rates'
import { useErrorMessage } from '@/composables/use-error-message'
import { isDateAfterToday } from '@/utils/date'

const selectedDate = ref(new Date())
const { data, isPending, isError } = useExchangeRates(selectedDate)
useErrorMessage(isError)
</script>

<template>
  <el-row align="middle" justify="space-between">
    <el-col :span="12">
      <h1>{{ $t("pages.history.title") }}</h1>
    </el-col>
    <el-col :span="12" class="picker-container">
      <el-date-picker
        v-model="selectedDate"
        type="date"
        :placeholder="$t('actions.selectDate')"
        :disabled-date="isDateAfterToday"
      />
    </el-col>
  </el-row>
  <el-divider />
  <el-skeleton v-if="!data || isPending" :rows="10" animated :throttle="300" />
  <ExchangeRatesTable v-else :data="data">
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
      <el-table-column prop="exchangeDate" :label="$t('currency.updateDate')" />
    </template>
    <template #actions="{ scope, edit }">
      <el-button type="warning" @click="edit(scope.row)">
        {{ $t("actions.edit") }}
      </el-button>
    </template>
  </ExchangeRatesTable>
</template>

<style scoped>
.picker-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
