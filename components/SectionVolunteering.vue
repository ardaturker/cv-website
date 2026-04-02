<script setup lang="ts">
import { volunteering } from '~/data/volunteering'
</script>

<template>
  <SectionWrapper id="volunteering" title="Volunteering & Leadership" :alt="true">
    <div class="space-y-0">
      <TimelineItem v-for="item in volunteering" :key="`${item.company}-${item.startDate}`" :item="item" />
    </div>
  </SectionWrapper>
</template>
