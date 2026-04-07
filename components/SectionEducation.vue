<script setup lang="ts">
import { education } from '~/data/education'
</script>

<template>
  <section id="education" class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Education"
        subtitle="Engineering foundations, digitalisation focus, Erasmus exchange."
      />
      <BaseTimeline :items="education" />
    </div>
  </section>
</template>
