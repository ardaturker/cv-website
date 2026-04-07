<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <div class="mb-12 text-center" data-reveal>
    <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
      {{ subtitle }}
    </p>
    <div class="mt-4 mx-auto w-16 h-1 rounded-full bg-primary-500" />
  </div>
</template>
