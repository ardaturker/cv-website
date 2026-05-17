<script setup lang="ts">
import { photos } from '~/data/photos'

const categories = computed(() =>
  ['All', ...new Set(photos.map(p => p.category).filter(Boolean) as string[])]
)
const selected = ref('All')
const filtered = computed(() =>
  selected.value === 'All' ? photos : photos.filter(p => p.category === selected.value)
)
</script>

<template>
  <section id="photos" class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Photo Library"
        subtitle="A glimpse into life beyond the CV."
      />

      <!-- Category filter (only shown when multiple categories exist) -->
      <div v-if="categories.length > 2" class="flex flex-wrap justify-center gap-2 mb-10" data-reveal>
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selected = cat"
          class="px-4 py-1.5 text-sm font-medium rounded-full border transition-colors"
          :class="selected === cat
            ? 'bg-primary-600 text-white border-primary-600'
            : 'text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Uniform photo grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(photo, i) in filtered"
          :key="photo.src"
          data-reveal
          :style="`transition-delay: ${(i % 4) * 80}ms`"
          class="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-[4/3] shadow-sm"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-if="photo.caption || photo.category"
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
          >
            <span
              v-if="photo.category"
              class="text-xs font-mono text-primary-300 uppercase tracking-widest mb-1"
            >{{ photo.category }}</span>
            <p
              v-if="photo.caption"
              class="text-white text-sm font-medium leading-snug"
            >{{ photo.caption }}</p>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <p v-if="filtered.length === 0" class="text-center py-16 text-slate-400 dark:text-slate-600">
        No photos in this category yet.
      </p>
    </div>
  </section>
</template>
