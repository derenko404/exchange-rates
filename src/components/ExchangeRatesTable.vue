<script setup lang="ts" generic="T extends { currencyCode: string; exchangeRate: number; }">
import type { FormInstance } from 'element-plus'

import { ElMessage } from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSaveCustomExchangeRate } from '@/composables/custom-exchange-rates'
import { isPositiveNumber } from '@/utils/validators'

const { data } = defineProps<{
  data: T[]
}>()

defineSlots<{
  default: () => any
  actions: (props: { edit: (row: T) => void, scope: any }) => any
}>()

const ITEMS_PER_PAGE = 10

const { t } = useI18n()
const saveMutation = useSaveCustomExchangeRate()

const page = ref(1)
const search = ref('')
const isEditDialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  exchangeRate: 0,
})
const selectedItem = ref<null | T>(null)

const tableData = computed(() => {
  const start = (page.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const paginated = data
    .filter(
      item =>
        !search.value
        || item.currencyCode.toLowerCase().includes(search.value.toLowerCase()),
    )
    .slice(start, end)

  return paginated
})

watch(search, (_, oldValue) => {
  if (oldValue === '') {
    page.value = 1
  }
})

function handleChangePage(newPage: number) {
  page.value = newPage
}

function handleEdit(row: T) {
  selectedItem.value = row
  form.exchangeRate = row.exchangeRate
  isEditDialogVisible.value = true
}

function handleSave(formInstance: FormInstance | undefined) {
  if (!formInstance)
    return

  formInstance.validate((valid) => {
    if (valid && selectedItem.value) {
      isEditDialogVisible.value = false
      saveMutation.mutate({
        ...selectedItem.value,
        exchangeRate: form.exchangeRate,
      })

      ElMessage({
        type: 'success',
        message: t('feedback.savingCompleted', { subject: selectedItem.value.currencyCode }),
      })
    }
  })
}

function handleCancel() {
  isEditDialogVisible.value = false
  selectedItem.value = null
  form.exchangeRate = 0
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <slot />
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          :placeholder="$t('actions.search', { by: $t('currency.code') })"
        />
      </template>
      <template #default="scope">
        <slot name="actions" :scope="scope" :edit="handleEdit" />
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-container">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="ITEMS_PER_PAGE"
      :total="data.length"
      :current-page="page"
      @current-change="handleChangePage"
    />
  </div>

  <el-dialog
    v-model="isEditDialogVisible"
    :title="$t('actions.editExchangeRate')"
    width="500"
  >
    <el-form ref="formRef" :model="form">
      <el-form-item>
        <p>
          {{ selectedItem?.currencyCode }} - ({{ selectedItem?.currencyName }})
        </p>
      </el-form-item>
      <el-form-item
        prop="exchangeRate"
        :rules="[
          { required: true, message: t('validations.required', { field: t('forms.labels.exchangeRate') }) },
          { type: 'number', message: t('validations.type', { field: t('forms.labels.exchangeRate'), type: 'number' }) },
          {
            validator: isPositiveNumber(t('validations.positive', { field: t('forms.labels.exchangeRate') })),
            trigger: 'blur',
          },
        ]"
        :label="$t('forms.labels.exchangeRate')"
      >
        <el-input
          v-model.number="form.exchangeRate"
          type="number"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">
          {{ t("actions.cancel") }}
        </el-button>
        <el-button type="primary" @click="handleSave(formRef)">
          {{ t("actions.save") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
