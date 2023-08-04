<template>
  <n-config-provider
    inline-theme-disabled
    :abstract="true"
    :theme="themeObj"
  >
    <n-message-provider :max="1">
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { useColorScheme } from '@/composables/useColorScheme'
import { RouterView } from 'vue-router'

const isDark = useColorScheme()

const themeObj = computed(() => isDark.value ? darkTheme : undefined)
</script>
