<script setup lang="ts">
defineProps<{ skill: string; color?: string }>()
</script>

<template>
  <span class="font-mono text-xs px-2.5 py-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 cursor-default">
    {{ skill }}
  </span>
</template>
