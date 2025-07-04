<script setup lang="ts">
import type { ExchangeRate } from '@/services/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

import ExchangeRatesTable from '@/components/ExchangeRatesTable.vue'
import {
  useCustomExchangeRates,
  useDeleteCustomExchangeRate,
} from '@/composables/custom-exchange-rates'
import { useErrorMessage } from '@/composables/use-error-message'

const { data, isPending, isError } = useCustomExchangeRates()
useErrorMessage(isError)
const { t } = useI18n()
const deleteMutation = useDeleteCustomExchangeRate()

async function handleDelete(row: ExchangeRate) {
  try {
    await ElMessageBox.confirm(
      t('confirmation.deleteExchangeRate', { currencyCode: row.currencyCode }),
      t('confirmation.confirmDeletion'),
      {
        confirmButtonText: t('actions.ok'),
        cancelButtonText: t('actions.cancel'),
      },
    )

    deleteMutation.mutate({ currencyCode: row.currencyCode })

    ElMessage({
      type: 'success',
      message: t('feedback.deletionCompleted', { subject: row.currencyCode }),
    })
  }
  catch {
    ElMessage({
      type: 'info',
      message: t('feedback.deletionCanceled', { subject: row.currencyCode }),
    })
  }
}
</script>

<template>
  <h1>{{ $t("pages.customExchangeRates.title") }}</h1>
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
    </template>
    <template #actions="{ scope, edit }">
      <el-button type="warning" @click="edit(scope.row)">
        {{ $t("actions.edit") }}
      </el-button>
      <el-button type="danger" @click="handleDelete(scope.row)">
        {{
          $t("actions.delete")
        }}
      </el-button>
    </template>
  </ExchangeRatesTable>
</template>

<style scoped></style>
