<script setup lang="ts">
import { experience } from '~/data/experience'
</script>

<template>
  <SectionWrapper id="experience" title="Experience" :alt="true">
    <div class="relative pl-0 space-y-0">
      <TimelineItem v-for="item in experience" :key="`${item.company}-${item.startDate}`" :item="item" />
    </div>
  </SectionWrapper>
</template>
