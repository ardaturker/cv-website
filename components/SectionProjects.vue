<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <SectionWrapper id="projects" title="Projects" :alt="true">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
    </div>
  </SectionWrapper>
</template>
