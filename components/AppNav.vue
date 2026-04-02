<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const mobileOpen = ref(false)
const activeSection = ref('hero')
const scrolled = ref(false)

const links = [
  { label: 'About', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Volunteering', href: '#volunteering' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 }, { passive: true })
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id }),
    { rootMargin: '-40% 0px -55% 0px' },
  )
  links.forEach(({ href }) => {
    const el = document.querySelector(href)
    if (el) observer.observe(el)
  })
})

function toggleMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <nav
    :class="scrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent border-b border-transparent'"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  >
    <div class="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
      <a href="#hero">
        <img src="/signature.png" alt="Arda Türker" class="h-10 dark:invert opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply dark:mix-blend-normal" />
      </a>

      <div class="hidden md:flex items-center gap-0">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="activeSection === link.href.slice(1)
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          class="font-mono text-sm px-4 py-2 transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-1">
        <button
          class="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          @click="toggleMode"
          :aria-label="mode === 'dark' ? 'Light mode' : 'Dark mode'"
        >
          <!-- Sun icon -->
          <svg v-if="mode === 'dark'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="4"/>
            <path stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <!-- Moon icon -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>

        <button
          class="md:hidden w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          @click="mobileOpen = !mobileOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <Transition name="slide">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-col"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="activeSection === link.href.slice(1) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'"
          class="font-mono text-sm py-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
