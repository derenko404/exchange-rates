import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export function useErrorMessage(isError: Ref<boolean>, message = 'errors.generic') {
  const { t } = useI18n()

  watchEffect(() => {
    if (isError.value) {
      ElMessage({
        type: 'error',
        message: t(message),
      })
    }
  })
}
