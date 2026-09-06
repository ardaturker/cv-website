<script setup lang="ts">
import { projects } from '~/data/projects'

const TRACKS = ['All', 'Research', 'Data', 'Engineering'] as const

const track = ref(0)
const selected = ref(0)

const visible = computed(() =>
  projects
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => TRACKS[track.value] === 'All' || p.track === TRACKS[track.value]),
)

/** Selection falls back to the first visible project when a tab hides the current one. */
const selectedIdx = computed(() =>
  visible.value.some(v => v.i === selected.value) ? selected.value : (visible.value[0]?.i ?? 0),
)

/**
 * Picking a face selects that project. The track is reset to "All" so the
 * choice can't be immediately hidden by an active filter.
 */
function selectFromCube(index: number) {
  selected.value = index
  track.value = 0
}

const detail = computed(() => {
  const p = projects[selectedIdx.value]
  return {
    ...p,
    metaLine: [p.kind, p.level, ...p.meta].join('  ·  '),
    toolLine: p.techStack.join('   /   '),
    work: p.work.map(w => ({
      name: w.name,
      tier: contributionTier(w.value),
      cells: statCells(w.value),
    })),
  }
})
</script>

<template>
  <section id="projects" class="bg-stat-ground font-sans text-stat-ink">
    <div class="max-w-[1080px] mx-auto px-6 pt-14 pb-20">
      <div data-reveal>
        <h2 class="m-0 mb-2.5 font-display font-bold uppercase tracking-[.02em] text-[clamp(30px,4.2vw,44px)] leading-tight">
          Papers &amp; Projects
        </h2>
        <p class="m-0 mb-[34px] max-w-[56ch] text-base leading-[1.55] text-stat-ink-dim-3 text-pretty">
          Academic projects, engineering challenges, and data work.
        </p>

        <div class="flex gap-6 mb-[26px] border-b border-stat-hairline-strong">
          <button
            v-for="(name, i) in TRACKS"
            :key="name"
            type="button"
            :aria-current="i === track ? 'true' : undefined"
            class="pb-3 -mb-px border-b bg-transparent font-mono text-[11px] tracking-[.14em] uppercase transition-colors"
            :class="i === track
              ? 'border-stat-accent text-white'
              : 'border-transparent text-stat-ink-mono hover:text-stat-ink'"
            @click="track = i"
          >
            {{ name }}
          </button>
        </div>
      </div>

      <div class="flex flex-wrap gap-[34px] items-start">
        <!-- Master list -->
        <div data-reveal class="flex-[1_1_240px] max-w-[300px] min-w-0 flex flex-col">
          <button
            v-for="{ p, i } in visible"
            :key="p.title"
            type="button"
            :aria-pressed="i === selectedIdx"
            class="block w-full text-left border-l-2 pl-3.5 py-[11px] bg-transparent transition-colors"
            :class="i === selectedIdx ? 'border-stat-accent' : 'border-stat-hairline-strong hover:border-stat-hover'"
            @click="selected = i"
          >
            <div
              class="text-[15px] font-medium leading-[1.35] text-pretty transition-colors"
              :class="i === selectedIdx ? 'text-white' : 'text-stat-ink-dim'"
            >
              {{ p.title }}
            </div>
            <div class="mt-1 font-mono text-[10px] tracking-[.12em] uppercase text-stat-ink-mono-2">
              {{ p.kind }} · {{ p.level }}
            </div>
          </button>
        </div>

        <!-- Detail -->
        <div data-reveal class="flex-[1_1_420px] min-w-0">
          <!-- The cube stands where the project photo used to. Each face carries
               one project's picture (see `cubeImage` in data/projects.ts), so the
               artwork lives on the cube rather than in a still above it.
               Decorative shortcut only: the text list to the left is the
               accessible, keyboard-navigable way to reach every project. -->
          <ClientOnly>
            <!-- No data-reveal inside: useScrollReveal collects those elements in
                 app.vue's onMounted, which runs before ClientOnly content exists,
                 so the wrapper would never receive .is-visible and would stay at
                 opacity 0 — taking the cube with it. -->
            <div class="mb-[22px] border border-stat-hairline-strong bg-[#0b1219]">
              <LazyProjectCube
                hydrate-on-visible
                :projects="projects"
                :selected="selectedIdx"
                @select="selectFromCube"
              />
              <div class="px-4 pb-3 font-mono text-[10px] tracking-[.14em] uppercase text-stat-ink-mono-2 text-center">
                Drag to turn · click a face to open that project
              </div>
            </div>

            <!-- Holds the same room before hydration so the detail column below
                 doesn't jump once the canvas mounts. -->
            <template #fallback>
              <div class="mb-[22px] border border-stat-hairline-strong bg-[#0b1219]">
                <div
                  class="w-full h-[clamp(240px,58vw,340px)]"
                  style="background-image: repeating-linear-gradient(135deg, #111a24 0 12px, #0d151d 12px 24px)"
                />
                <div class="px-4 pb-3 font-mono text-[10px] tracking-[.14em] uppercase text-stat-ink-mono-2 text-center">
                  Drag to turn · click a face to open that project
                </div>
              </div>
            </template>
          </ClientOnly>

          <h3 class="m-0 mb-2.5 font-display font-bold text-[clamp(22px,2.6vw,30px)] leading-[1.2] text-pretty">
            {{ detail.title }}
          </h3>
          <div class="mb-[22px] font-mono text-[10.5px] tracking-[.12em] uppercase text-stat-ink-mono leading-[1.9] whitespace-pre-wrap">
            {{ detail.metaLine }}
          </div>

          <p class="m-0 mb-[30px] text-[15.5px] leading-[1.65] text-stat-ink-4 text-pretty">
            {{ detail.description }}
          </p>

          <div class="mb-3.5 font-mono text-[10.5px] tracking-[.18em] text-stat-ink-mono">
            MY CONTRIBUTION — {{ detail.share }} · {{ detail.role }}
          </div>
          <div v-for="w in detail.work" :key="w.name" class="mb-3.5">
            <div class="flex items-baseline justify-between gap-3.5 mb-1.5">
              <span class="text-sm text-stat-ink-2 text-pretty">{{ w.name }}</span>
              <span class="font-mono text-[10px] tracking-[.1em] uppercase text-stat-ink-dim-2 whitespace-nowrap">{{ w.tier }}</span>
            </div>
            <div class="grid grid-cols-5 gap-1">
              <div v-for="(pct, i) in w.cells" :key="i" class="h-1.5 bg-stat-track overflow-hidden">
                <div
                  class="h-full bg-stat-accent transition-[width] duration-500 ease-[cubic-bezier(.22,.8,.28,1)]"
                  :style="{ width: `${pct}%` }"
                />
              </div>
            </div>
          </div>

          <div class="mt-[30px] mb-3 font-mono text-[10.5px] tracking-[.18em] text-stat-ink-mono">CREW</div>
          <div class="flex flex-col gap-2 mb-[30px]">
            <div
              v-for="person in detail.crew"
              :key="person.name + person.role"
              class="flex items-baseline justify-between gap-4 pb-2 border-b border-stat-hairline"
            >
              <span
                class="text-[14.5px] text-pretty"
                :class="person.placeholder ? 'text-stat-placeholder' : 'text-stat-ink'"
              >
                {{ person.name }}
              </span>
              <span class="font-mono text-[10px] tracking-[.1em] uppercase text-stat-ink-mono whitespace-nowrap">
                {{ person.role }}
              </span>
            </div>
          </div>

          <div class="font-mono text-[11px] tracking-[.1em] text-stat-ink-dim-2 leading-[1.9] whitespace-pre-wrap">
            {{ detail.toolLine }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
