<script setup lang="ts">
import { education } from '~/data/education'
</script>

<template>
  <SectionWrapper id="education" title="Education" :alt="true">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="item in education"
        :key="item.school"
        class="border border-slate-200 dark:border-slate-800 p-6 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-200 animate-on-scroll"
      >
        <span class="font-mono text-xs text-slate-400 dark:text-slate-500">{{ item.year }}</span>
        <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-2">{{ item.degree }}</p>
        <h3 class="font-semibold text-slate-900 dark:text-white mb-1">{{ item.field }}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.school }}</p>
      </div>
    </div>
  </SectionWrapper>
</template>
