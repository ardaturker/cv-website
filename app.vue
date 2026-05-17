<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
useSeo()
useScrollReveal()
</script>

<template>
  <div :class="{ dark: mode === 'dark' }">
    <AppSplash />
    <SchemaOrg />
    <div class="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300 antialiased">
      <AppNav />
      <main>
        <SectionHero />
        <SectionExperience />
        <SectionVolunteering />
        <SectionEducation />
        <SectionSkills />
        <SectionProjects />
        <SectionPhotos />
        <SectionContact />
      </main>
    </div>
  </div>
</template>
