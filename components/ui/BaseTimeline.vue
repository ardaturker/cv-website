<script setup lang="ts">
defineProps<{ items: any[] }>()

const formatDate = (date: string | null) => {
  if (!date) return 'Present'
  const [year, month] = date.split('-')
  if (!month) return year
  const d = new Date(Number(year), Number(month) - 1)
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="relative">
    <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="relative pl-16 pb-12 last:pb-0"
      data-reveal
      :style="`transition-delay: ${idx * 100}ms`"
    >
      <div class="absolute left-4 top-1 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-slate-950 shadow-sm" />
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              {{ item.role || item.title || (item.degree + ' in ' + item.field) }}
            </h3>
            <p class="text-primary-600 dark:text-primary-400 font-semibold text-sm">
              {{ item.company || item.institution }}
            </p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {{ formatDate(item.startDate) }} — {{ formatDate(item.endDate) }}
            </span>
            <p v-if="item.location" class="text-xs text-slate-400 mt-1">{{ item.location }}</p>
          </div>
        </div>

        <p v-if="item.description" class="text-slate-600 dark:text-slate-400 text-sm mb-4">
          {{ item.description }}
        </p>

        <ul v-if="item.bullets?.length" class="space-y-1.5 mb-4">
          <li
            v-for="bullet in item.bullets"
            :key="bullet"
            class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
          >
            <Icon name="mdi:check-circle" class="text-primary-500 mt-0.5 shrink-0 text-base" />
            {{ bullet }}
          </li>
        </ul>

        <ul v-if="item.subjects?.length" class="flex flex-wrap gap-2 mb-2">
          <li
            v-for="subject in item.subjects"
            :key="subject"
            class="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md"
          >
            {{ subject }}
          </li>
        </ul>

        <div v-if="item.technologies?.length" class="flex flex-wrap gap-2 mt-3">
          <BaseTag v-for="tech in item.technologies" :key="tech">{{ tech }}</BaseTag>
        </div>
      </div>
    </div>
  </div>
</template>
