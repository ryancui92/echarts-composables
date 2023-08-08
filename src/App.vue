<template>
  <n-config-provider
    inline-theme-disabled
    :abstract="true"
    :theme="themeObj"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <n-message-provider :max="1">
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useColorScheme } from '@/composables/useColorScheme'
import { RouterView } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('typescript', typescript)

const isDark = useColorScheme()

const themeObj = computed(() => isDark.value ? darkTheme : undefined)
</script>
