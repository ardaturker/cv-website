<script setup lang="ts">
import type { Project } from '~/types'
defineProps<{ project: Project }>()
</script>

<template>
  <div class="border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-200 animate-on-scroll flex flex-col overflow-hidden">
    <!-- Optional project image banner -->
    <div v-if="project.image" class="w-full h-36 overflow-hidden border-b border-slate-200 dark:border-slate-800">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>

    <div class="p-6 flex flex-col flex-1">
      <h3 class="font-semibold text-slate-900 dark:text-white mb-2">{{ project.title }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">{{ project.description }}</p>
      <div class="flex flex-wrap gap-1.5 mb-5">
        <span
          v-for="tech in project.techStack"
          :key="tech"
          class="font-mono text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
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
          class="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Live →
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-mono text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          GitHub →
        </a>
        <span v-if="!project.liveUrl && !project.githubUrl" class="text-xs font-mono text-slate-300 dark:text-slate-700">
          Academic project
        </span>
      </div>
    </div>
  </div>
</template>
