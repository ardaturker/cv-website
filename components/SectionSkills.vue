<script setup lang="ts">
import { skills, languages } from '~/data/skills'
</script>

<template>
  <section id="skills" class="py-24 bg-slate-50 dark:bg-slate-900/50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <BaseSectionHeading
        title="Skills & Expertise"
        subtitle="A blend of engineering, data analytics, and digital supply chain capability."
      />

      <!-- Skill category cards -->
      <div class="grid sm:grid-cols-2 gap-6 mb-16">
        <div
          v-for="(cat, i) in skills"
          :key="cat.category"
          data-reveal
          :style="`transition-delay: ${i * 100}ms`"
          class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
              <Icon :name="cat.icon" class="text-primary-600 dark:text-primary-400 text-xl" />
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white">{{ cat.category }}</h3>
          </div>
          <div class="space-y-3">
            <div v-for="skill in cat.items" :key="skill.name">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-700 dark:text-slate-300">{{ skill.name }}</span>
              </div>
              <div class="flex gap-1">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="h-2 flex-1 rounded-full transition-colors"
                  :class="n <= skill.level ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div data-reveal class="mt-4">
        <h3 class="text-sm font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4 text-center">Languages</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <div
            v-for="lang in languages"
            :key="lang.name"
            class="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2"
          >
            <span class="font-semibold text-slate-900 dark:text-white text-sm">{{ lang.name }}</span>
            <span class="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">{{ lang.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
