<script setup lang="ts">
import { skills, languages } from '~/data/skills'
import { profile } from '~/data/profile'

const tab = ref(0)

const allSkills = computed(() => skills.flatMap(c => c.items))
const statCount = computed(() => allSkills.value.length)
const overall = computed(() =>
  Math.round(allSkills.value.reduce((sum, s) => sum + s.value, 0) / allSkills.value.length),
)

const rows = computed(() =>
  skills[tab.value].items.map(s => ({
    name: s.name,
    tier: skillTier(s.value),
    cells: statCells(s.value),
  })),
)

const prevTab = () => { tab.value = (tab.value + skills.length - 1) % skills.length }
const nextTab = () => { tab.value = (tab.value + 1) % skills.length }
</script>

<template>
  <section
    id="skills"
    class="font-sans text-stat-ink"
    style="background: radial-gradient(120% 90% at 50% 0%, #101822 0%, #06090d 70%)"
  >
    <div class="max-w-[1120px] mx-auto px-6 pt-14 pb-[72px]">
      <div data-reveal class="flex flex-col items-center gap-2.5 mb-9 text-center">
        <h2 class="font-display font-bold uppercase tracking-[.02em] text-[clamp(34px,5vw,52px)] leading-tight m-0">
          Skills &amp; Expertise
        </h2>
        <p class="m-0 max-w-[52ch] text-base leading-[1.5] text-stat-ink-dim-2 text-pretty">
          A blend of engineering, data analytics, and digital supply chain capability.
        </p>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px] items-stretch">
        <!-- Portrait panel -->
        <div
          data-reveal
          class="relative flex flex-col border border-stat-border min-h-[520px]"
          style="background: linear-gradient(180deg, #0d141c, #0a1016)"
        >
          <div class="flex-1 m-3.5 overflow-hidden">
            <template v-if="profile.avatarUrl">
              <ClientOnly>
                <!-- hydrate-on-visible keeps three.js out of the initial bundle. -->
                <LazyStatCharacter
                  hydrate-on-visible
                  :poster="profile.avatarUrl"
                  :alt="`Portrait of ${profile.name}`"
                />
                <template #fallback>
                  <img
                    :src="profile.avatarUrl"
                    :alt="`Portrait of ${profile.name}`"
                    class="w-full h-full object-cover"
                  >
                </template>
              </ClientOnly>
            </template>
            <div
              v-else
              class="w-full h-full flex items-end justify-center p-5 font-mono text-[11px] tracking-[.14em] text-stat-ink-mono text-center leading-[1.7]"
              style="background-image: repeating-linear-gradient(135deg, #111a24 0 10px, #0c141c 10px 20px)"
            >
              PORTRAIT
            </div>
          </div>
          <div class="flex justify-between items-baseline px-4 pb-4 font-mono text-[11px] tracking-[.14em] text-stat-ink-mono">
            <span>PROFILE</span>
            <span>{{ statCount }} SKILLS TRACKED</span>
          </div>
        </div>

        <!-- Stats panel -->
        <div
          data-reveal
          class="min-w-0 flex flex-col border border-stat-border"
          style="background: linear-gradient(180deg, #0d141c, #0a1016)"
        >
          <div class="flex items-center justify-between gap-3 px-4 py-[11px] bg-stat-accent-deep border-b border-stat-accent-deep-edge">
            <span class="font-display font-bold text-[15px] tracking-[.12em] uppercase">{{ profile.name }}</span>
            <span class="font-mono text-[11px] tracking-[.16em] text-stat-accent-tint-hi">STATS</span>
          </div>

          <div class="flex items-center gap-[18px] px-4 py-[18px] border-b border-stat-hairline-panel">
            <div
              class="relative w-[78px] h-[78px] flex-none rounded-full border-[3px] border-stat-accent bg-stat-badge-bg flex items-center justify-center"
              style="box-shadow: 0 0 0 4px #0d1520, 0 0 24px rgba(47, 155, 255, .28)"
            >
              <span class="font-display font-bold text-[34px] leading-none text-stat-accent">{{ overall }}</span>
            </div>
            <div class="min-w-0 ml-auto flex flex-col gap-[5px] text-right text-sm text-stat-ink-3">
              <span>Industrial Engineering</span>
              <span>Data &amp; Analytics</span>
              <span>Digital Supply Chain</span>
            </div>
          </div>

          <div class="flex items-stretch bg-stat-panel-foot border-b border-stat-hairline-panel">
            <button
              type="button"
              aria-label="Previous category"
              class="flex-none w-[38px] border-r border-stat-hairline-panel text-[15px] text-stat-ink-mono hover:text-stat-ink hover:bg-[#111a24] transition-colors"
              @click="prevTab"
            >
              &lsaquo;
            </button>
            <div class="flex-1 min-w-0 flex">
              <button
                v-for="(cat, i) in skills"
                :key="cat.category"
                type="button"
                :aria-pressed="i === tab"
                class="flex-1 min-w-0 px-1.5 py-[11px] border-b-2 font-mono text-[10.5px] tracking-[.12em] uppercase whitespace-nowrap overflow-hidden text-ellipsis transition-colors"
                :class="i === tab
                  ? 'border-stat-accent text-white'
                  : 'border-transparent text-stat-ink-mono hover:text-stat-ink'"
                @click="tab = i"
              >
                {{ cat.tab }}
              </button>
            </div>
            <button
              type="button"
              aria-label="Next category"
              class="flex-none w-[38px] border-l border-stat-hairline-panel text-[15px] text-stat-ink-mono hover:text-stat-ink hover:bg-[#111a24] transition-colors"
              @click="nextTab"
            >
              &rsaquo;
            </button>
          </div>

          <div class="pt-1.5 pb-2.5">
            <div
              v-for="row in rows"
              :key="row.name"
              class="px-4 pt-[9px] pb-[11px] border-b border-stat-hairline hover:bg-stat-row-hover transition-colors"
            >
              <div class="flex items-baseline justify-between gap-4 mb-[7px]">
                <span class="text-[15px] font-medium tracking-[.01em]">{{ row.name }}</span>
                <span class="font-mono text-[11px] tracking-[.12em] uppercase text-stat-accent-tint whitespace-nowrap">{{ row.tier }}</span>
              </div>
              <div class="grid grid-cols-5 gap-[5px]">
                <div v-for="(pct, i) in row.cells" :key="i" class="h-[9px] bg-stat-track-lg overflow-hidden">
                  <div
                    class="h-full transition-[width] duration-[550ms] ease-[cubic-bezier(.22,.8,.28,1)]"
                    :style="{ width: `${pct}%`, background: 'linear-gradient(180deg, #5cb4ff, #1e86ec)' }"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-auto p-4 border-t border-stat-hairline-panel bg-stat-panel-foot">
            <div class="font-mono text-[10.5px] tracking-[.18em] text-stat-ink-mono mb-3">LANGUAGES</div>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="lang in languages"
                :key="lang.name"
                class="flex items-baseline gap-2 px-[11px] py-[7px] border border-stat-border bg-[#0e1620]"
              >
                <span class="text-sm font-medium">{{ lang.name }}</span>
                <span class="font-mono text-[10.5px] tracking-[.1em] uppercase text-stat-accent-tint">{{ lang.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
