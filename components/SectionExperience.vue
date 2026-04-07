<script setup lang="ts">
import { experience } from '~/data/experience'
</script>

<template>
  <section id="experience" class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Work Experience"
        subtitle="From data pipelines at OJ Electronics to hands-on operations."
      />
      <BaseTimeline :items="experience" />
    </div>
  </section>
</template>
