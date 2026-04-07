<script setup lang="ts">
import type { Project } from '~/types'
defineProps<{ project: Project }>()
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col overflow-hidden"
    data-reveal
  >
    <!-- Image or color placeholder -->
    <div class="w-full h-44 overflow-hidden border-b border-slate-200 dark:border-slate-800 shrink-0">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
      />
      <div
        v-else
        class="w-full h-full flex items-end p-4"
        :class="{
          'bg-blue-50 dark:bg-blue-950/30': project.color === 'blue',
          'bg-orange-50 dark:bg-orange-950/30': project.color === 'orange',
          'bg-emerald-50 dark:bg-emerald-950/30': project.color === 'green',
        }"
      >
        <span
          class="font-mono text-xs tracking-widest uppercase"
          :class="{
            'text-blue-400 dark:text-blue-600': project.color === 'blue',
            'text-orange-400 dark:text-orange-600': project.color === 'orange',
            'text-emerald-400 dark:text-emerald-600': project.color === 'green',
          }"
        >{{ project.color === 'blue' ? 'Data & Research' : project.color === 'orange' ? 'Engineering' : 'Analytics' }}</span>
      </div>
    </div>

    <div class="p-6 flex flex-col flex-1">
      <h3 class="font-semibold text-slate-900 dark:text-white mb-2">{{ project.title }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">{{ project.description }}</p>
      <div class="flex flex-wrap gap-1.5 mb-5">
        <span
          v-for="tech in project.techStack"
          :key="tech"
          class="font-mono text-xs px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md"
        >
          {{ tech }}
        </span>
      </div>
      <div class="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-mono text-primary-600 dark:text-primary-400 hover:underline"
        >
          Live →
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-mono text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          GitHub →
        </a>
        <span v-if="!project.liveUrl && !project.githubUrl" class="text-xs font-mono text-slate-300 dark:text-slate-600">
          Academic project
        </span>
      </div>
    </div>
  </div>
</template>
