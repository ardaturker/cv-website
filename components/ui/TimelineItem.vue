<script setup lang="ts">
import type { ExperienceItem } from '~/types'
defineProps<{ item: ExperienceItem }>()
</script>

<template>
  <div class="relative pl-6 animate-on-scroll">
    <div class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
    <div class="pb-8 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.company }}</h3>
        <span class="font-mono text-xs text-slate-400 dark:text-slate-500 shrink-0">{{ item.startDate }} — {{ item.endDate }}</span>
      </div>
      <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">{{ item.title }}</p>
      <p v-if="item.location" class="font-mono text-xs text-slate-400 dark:text-slate-500 mb-3">{{ item.location }}</p>
      <ul class="space-y-1.5">
        <li v-for="bullet in item.bullets" :key="bullet" class="flex gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span class="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          {{ bullet }}
        </li>
      </ul>
    </div>
  </div>
</template>
