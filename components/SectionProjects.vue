<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="projects" class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Projects"
        subtitle="Academic projects, engineering challenges, and data work."
      />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </div>
    </div>
  </section>
</template>
