<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'outline' | 'ghost'
  href?: string
  target?: string
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="target"
    class="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    :class="{
      'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg': variant === 'primary' || !variant,
      'border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20': variant === 'outline',
      'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800': variant === 'ghost',
    }"
  >
    <slot />
  </component>
</template>
