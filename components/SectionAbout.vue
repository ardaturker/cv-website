<script setup lang="ts">
import { profile } from '~/data/profile'

const stats = [
  { label: 'Hours / Week at OJ', value: '12h', icon: 'mdi:briefcase' },
  { label: 'Active MSc Courses', value: '6', icon: 'mdi:school' },
  { label: 'Countries', value: '3', icon: 'mdi:map-marker' },
  { label: 'Years Coding', value: '4+', icon: 'mdi:code-braces' },
]
</script>

<template>
  <section id="about" class="py-24 bg-slate-50 dark:bg-slate-900/50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading title="About Me" subtitle="Engineering student meets data builder — driven by automation, efficiency, and the next problem." />

      <!-- Bio block -->
      <div class="max-w-2xl mx-auto text-center mb-12" data-reveal>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Hi, I'm Arda 👋
        </h3>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {{ profile.bio }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 font-mono">
          <span class="flex items-center gap-1.5">
            <Icon name="mdi:map-marker" class="text-primary-500 text-base" />
            {{ profile.location }}
          </span>
          <span class="hidden sm:block text-slate-300 dark:text-slate-700">·</span>
          <a :href="`mailto:${profile.email}`" class="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Icon name="mdi:email" class="text-primary-500 text-base" />
            {{ profile.email }}
          </a>
          <span class="hidden sm:block text-slate-300 dark:text-slate-700">·</span>
          <span class="flex items-center gap-1.5">
            <Icon name="mdi:phone" class="text-primary-500 text-base" />
            {{ profile.phone }}
          </span>
        </div>
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <BaseButton variant="primary" @click="$el.ownerDocument.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })">
            <Icon name="mdi:email" />
            Get In Touch
          </BaseButton>
          <BaseButton variant="outline" :href="profile.social.linkedin" target="_blank">
            <Icon name="mdi:linkedin" />
            LinkedIn
          </BaseButton>
        </div>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          data-reveal
          :style="`transition-delay: ${i * 100}ms`"
          class="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <Icon :name="stat.icon" class="text-primary-500 text-3xl mx-auto mb-3" />
          <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1">{{ stat.value }}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
