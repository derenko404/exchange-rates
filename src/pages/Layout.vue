<script lang="ts" setup>
import { computed } from 'vue'
import { useCustomExchangeRates } from '@/composables/custom-exchange-rates'

const { data } = useCustomExchangeRates()
const customExchangeRatesCount = computed(() => data.value?.length ?? 0)
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header>
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item class="link" index="/">
            {{ $t("navigation.home") }}
          </el-menu-item>
          <el-menu-item class="link" index="/custom-exchange-rates">
            <el-badge :value="customExchangeRatesCount" class="badge">
              {{ $t("navigation.customExchangeRates") }}
            </el-badge>
          </el-menu-item>
          <el-menu-item class="link" index="/history">
            {{ $t("navigation.history") }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.layout {
  max-width: 1280px;
  margin: 0 auto;
}

.link {
  text-decoration: none;
}

.link:deep(.el-badge__content.is-fixed) {
  top: 10px !important;
}
</style>
