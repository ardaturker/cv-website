<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const { activeSection } = useActiveSection()
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'photos', label: 'Photos' },
  { id: 'contact', label: 'Contact' },
]

onMounted(() => {
  const handler = () => { scrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', handler, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handler))
})

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  mobileOpen.value = false
}

const toggleMode = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50'
      : 'bg-transparent'"
  >
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <!-- Logo -->
      <button @click="scrollTo('hero')">
        <img
          src="/signature.png"
          alt="Arda Türker"
          class="h-10 opacity-80 hover:opacity-100 transition-opacity"
          :class="scrolled ? 'mix-blend-multiply dark:mix-blend-normal dark:invert' : 'dark:invert mix-blend-multiply dark:mix-blend-normal'"
        />
      </button>

      <!-- Desktop nav links -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.id">
          <button
            @click="scrollTo(link.id)"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="activeSection === link.id
              ? (scrolled ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-white bg-white/10')
              : scrolled
                ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'"
          >
            {{ link.label }}
          </button>
        </li>
      </ul>

      <!-- Right: theme toggle + hamburger -->
      <div class="flex items-center gap-2">
        <button
          @click="toggleMode"
          :aria-label="mode === 'dark' ? 'Light mode' : 'Dark mode'"
          class="p-2 rounded-lg transition-colors"
          :class="scrolled
            ? 'text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'"
        >
          <Icon v-if="mode === 'dark'" name="mdi:weather-sunny" class="text-xl" />
          <Icon v-else name="mdi:weather-night" class="text-xl" />
        </button>

        <button
          class="md:hidden p-2 rounded-lg transition-colors"
          :class="scrolled
            ? 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'"
          @click="mobileOpen = !mobileOpen"
          aria-label="Menu"
        >
          <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="text-xl" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1"
      >
        <button
          v-for="link in navLinks"
          :key="link.id"
          @click="scrollTo(link.id)"
          class="block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors"
          :class="activeSection === link.id
            ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          {{ link.label }}
        </button>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
