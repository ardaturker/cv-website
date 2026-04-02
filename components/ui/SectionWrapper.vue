<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  title: string
  subtitle?: string
  alt?: boolean
}>(), { alt: false })

const el = ref<HTMLElement | null>(null)
onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'))
      }
    }),
    { threshold: 0.05 },
  )
  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <section
    ref="el"
    :id="id"
    :class="alt ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'"
    class="py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div class="mb-12 animate-on-scroll">
        <div class="flex items-baseline gap-4 mb-2">
          <span class="font-mono text-xs text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">{{ id }}</span>
        </div>
        <h2 class="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">{{ title }}</h2>
        <p v-if="subtitle" class="text-slate-500 dark:text-slate-400 mt-3 max-w-xl">{{ subtitle }}</p>
      </div>
      <slot />
    </div>
  </section>
</template>
