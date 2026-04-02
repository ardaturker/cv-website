<script setup lang="ts">
import { contact } from '~/data/contact'
const year = new Date().getFullYear()
</script>

<template>
  <SectionWrapper id="contact" title="Get In Touch" :alt="false">
    <div class="grid lg:grid-cols-2 gap-16">
      <!-- Left -->
      <div class="animate-on-scroll">
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
          Open to opportunities in supply chain digitalisation, data-driven operations,
          and process optimisation. Whether it's a thesis project, internship, or full-time role —
          feel free to reach out.
        </p>

        <div class="space-y-3">
          <a
            :href="`mailto:${contact.email}`"
            class="flex items-center gap-3 text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <span class="w-8 h-8 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            {{ contact.email }}
          </a>

          <a
            :href="contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <span class="w-8 h-8 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            LinkedIn
          </a>

          <a
            :href="contact.github"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <span class="w-8 h-8 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            GitHub
          </a>

          <a
            v-if="contact.instagram"
            :href="contact.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <span class="w-8 h-8 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </span>
            Instagram
          </a>

          <div class="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span class="w-8 h-8 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </span>
            +45 52 22 50 83
          </div>
        </div>
      </div>

      <!-- Right: quick facts -->
      <div class="animate-on-scroll space-y-0">
        <div v-for="(item, i) in [
          { label: 'Location', value: 'Sønderborg, Denmark' },
          { label: 'Status', value: 'MSc Student · SDU 2025–2027' },
          { label: 'Languages', value: 'Turkish, English, Danish, German' },
          { label: 'Availability', value: 'Open to internships & projects' },
        ]" :key="i" class="flex justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
          <span class="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">{{ item.label }}</span>
          <span class="text-sm text-slate-700 dark:text-slate-300 text-right">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="mt-16 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
      <span class="font-mono text-xs text-slate-300 dark:text-slate-600">© {{ year }} Arda Türker</span>
      <span class="font-mono text-xs text-slate-300 dark:text-slate-600">Nuxt 3 + Tailwind CSS</span>
    </div>
  </SectionWrapper>
</template>
