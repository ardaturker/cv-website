<script setup lang="ts">
import { contact } from '~/data/contact'
</script>

<template>
  <section id="hero" class="bg-white dark:bg-slate-950 min-h-screen flex items-center border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-5xl mx-auto px-6 py-20 w-full">

      <div class="grid lg:grid-cols-[1fr_auto] gap-16 items-start">
        <!-- Left: text -->
        <div>
          <!-- Mobile photo (shown below lg) -->
          <div class="lg:hidden mb-10">
            <div class="w-40 sm:w-48 relative">
              <img
                src="/avatar.jpg"
                alt="Arda Türker"
                class="w-full aspect-square object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
            </div>
          </div>

          <p class="font-mono text-xs text-slate-400 dark:text-slate-500 mb-8 tracking-widest uppercase">
            Supply Chain Digitalisation · MSc Student
          </p>

          <h1 class="font-sans font-extrabold text-6xl md:text-8xl text-slate-900 dark:text-white leading-none tracking-tight mb-8">
            Arda<br />Türker
          </h1>

          <div class="w-12 h-px bg-indigo-600 mb-8" />

          <p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
            MSc Supply Chain Digitalisation student at SDU with a BSc in Engineering, Innovation & Business and an Erasmus exchange at the University of Twente. Built forecasting models for the DK1 electricity market, optimised production simulations in Siemens Plant Simulation, and completed a bachelor thesis with a live startup on trading platform retention. Driven by data, operations, and the intersection of engineering and business.
          </p>

          <div class="flex flex-wrap gap-4 mb-12">
            <a
              href="#experience"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-200"
            >
              View Experience
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a
              :href="`mailto:${contact.email}`"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
            >
              {{ contact.email }}
            </a>
          </div>

          <div class="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500 font-mono">
            <span>📍 Sønderborg, Denmark</span>
            <span class="text-slate-200 dark:text-slate-700">|</span>
            <span>+45 52 22 50 83</span>
          </div>
        </div>

        <!-- Right: photos -->
        <div class="hidden lg:block">
          <div class="relative w-64 xl:w-72">
            <!-- Main photo -->
            <img
              src="/avatar.jpg"
              alt="Arda Türker"
              class="w-full aspect-square object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
            />
            <!-- Gradient fade over bottom of photo -->
            <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
            <img src="/signature.png" alt="Arda Türker" class="-mt-8 w-64 mx-auto mix-blend-multiply dark:mix-blend-normal dark:invert opacity-80 relative z-10" />

          </div>
        </div>
      </div>

    </div>
  </section>
</template>
