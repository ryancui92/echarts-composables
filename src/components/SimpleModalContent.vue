<template>
  <div class="bg-white dark:bg-neutral-800 box-border b-rd-8 flex flex-col gap-8">
    <div class="h-32 font-600 text-16 px-24 pt-24">
      {{ title }}
    </div>
    <div class="h-0 flex-1 px-24 py-2 overflow-auto" :class="$slots.footer ? '' : 'pb-24'">
      <slot />
    </div>
    <div v-if="$slots.footer" class="flex items-center justify-end gap-8 px-24 pt-2 pb-24">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
