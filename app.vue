<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
useSeo()
</script>

<template>
  <div :class="{ dark: mode === 'dark' }">
    <SchemaOrg />
    <div class="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 antialiased">
      <AppNav />
      <main class="pt-20">
        <SectionHero />
        <SectionExperience />
        <SectionVolunteering />
        <SectionEducation />
        <SectionSkills />
        <SectionProjects />
        <SectionContact />
      </main>
    </div>
  </div>
</template>
