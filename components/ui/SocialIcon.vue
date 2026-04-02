<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  href: string
  label: string
  icon: string
}>()
</script>

<template>
  <a
    :href="href"
    :aria-label="label"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-white/70 hover:text-orange-300 transition-all duration-200"
  >
    <Icon :icon="icon" class="w-5 h-5" />
  </a>
</template>
