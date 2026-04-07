<script setup lang="ts">
import { volunteering } from '~/data/volunteering'
</script>

<template>
  <section id="volunteering" class="py-24 bg-slate-50 dark:bg-slate-900/50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Volunteering & Leadership"
        subtitle="Community, peace-building, and student leadership across Europe."
      />
      <BaseTimeline :items="volunteering" />
    </div>
  </section>
</template>
