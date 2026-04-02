<script setup lang="ts">
const show = ref(false)
const entered = ref(false)
const leaving = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('_at_splash')) return
  sessionStorage.setItem('_at_splash', '1')

  show.value = true

  // Trigger entrance after paint
  requestAnimationFrame(() => requestAnimationFrame(() => {
    entered.value = true
  }))

  // Begin exit at 2.2s
  setTimeout(() => { leaving.value = true }, 2200)
  // Unmount at 2.9s (after CSS transition finishes)
  setTimeout(() => { show.value = false }, 2900)
})
</script>

<template>
  <Transition name="splash">
    <div
      v-if="show"
      class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950 select-none"
      :class="{ 'is-leaving': leaving }"
    >
      <!-- Logo mark -->
      <div class="splash-logo" :class="{ 'splash-logo--in': entered }">
        <svg width="72" height="72" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none">
          <rect width="40" height="40" rx="7" fill="#1e1b4b"/>
          <line x1="3" y1="33" x2="11" y2="7" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="11" y1="7" x2="19" y2="33" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="6.5" y1="22" x2="15.5" y2="22" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="22" y1="9" x2="37" y2="9" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="29.5" y1="9" x2="29.5" y2="33" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Name -->
      <p
        class="splash-name font-sans font-bold text-white text-xl tracking-tight mt-5"
        :class="{ 'splash-name--in': entered }"
      >
        Arda Türker
      </p>

      <!-- Subtitle -->
      <p
        class="splash-sub font-mono text-xs text-slate-500 tracking-widest uppercase mt-2"
        :class="{ 'splash-sub--in': entered }"
      >
        Supply Chain · Developer
      </p>

      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-slate-800">
        <div class="splash-progress h-full bg-orange-500" :class="{ 'splash-progress--run': entered }" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Entrance animations */
.splash-logo {
  opacity: 0;
  transform: scale(0.82) translateY(8px);
  transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.splash-logo--in {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.splash-name {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
}
.splash-name--in {
  opacity: 1;
  transform: translateY(0);
}

.splash-sub {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.45s ease 0.35s, transform 0.45s ease 0.35s;
}
.splash-sub--in {
  opacity: 1;
  transform: translateY(0);
}

/* Progress bar */
.splash-progress {
  width: 0%;
  transition: none;
}
.splash-progress--run {
  width: 100%;
  transition: width 1.9s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

/* Exit: whole overlay fades up and out */
.splash-leave-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.splash-leave-to {
  opacity: 0;
  transform: translateY(-28px);
}
</style>
