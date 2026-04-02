<script setup lang="ts">
import { skills } from '~/data/skills'
</script>

<template>
  <SectionWrapper id="skills" title="Skills & Competencies" :alt="false">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="category in skills" :key="category.category" class="animate-on-scroll">
        <h3 class="font-mono text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4">
          {{ category.category }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <SkillTag v-for="skill in category.skills" :key="skill" :skill="skill" />
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
