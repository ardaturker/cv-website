<script setup lang="ts">
const show = ref(false)
const entered = ref(false)
const leaving = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('_at_splash')) return
  sessionStorage.setItem('_at_splash', '1')

  show.value = true

  requestAnimationFrame(() => requestAnimationFrame(() => {
    entered.value = true
  }))

  // Begin exit at 3.5s
  setTimeout(() => { leaving.value = true }, 3500)
  // Unmount at 4.2s
  setTimeout(() => { show.value = false }, 4200)
})
</script>

<template>
  <Transition name="xp-fade">
    <div
      v-if="show"
      class="xp-boot fixed inset-0 z-[200] flex flex-col items-center justify-center select-none"
      :class="{ 'is-leaving': leaving }"
    >
      <!-- Windows XP Logo -->
      <div class="xp-logo" :class="{ 'xp-logo--in': entered }">
        <!-- 4-color waving flag -->
        <svg width="96" height="88" viewBox="0 0 96 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Red quadrant (top-left) -->
          <path d="M0 8 C16 6, 44 4, 46 0 L46 40 C44 40, 16 40, 0 40 Z" fill="#FF3300"/>
          <!-- Green quadrant (top-right) -->
          <path d="M50 0 C52 4, 80 6, 96 8 L96 40 C80 40, 52 40, 50 40 Z" fill="#00A550"/>
          <!-- Blue quadrant (bottom-left) -->
          <path d="M0 44 C16 44, 44 44, 46 44 L46 84 C44 88, 16 86, 0 84 Z" fill="#0066CC"/>
          <!-- Yellow quadrant (bottom-right) -->
          <path d="M50 44 C52 44, 80 44, 96 44 L96 80 C80 82, 52 84, 50 84 Z" fill="#FFB300"/>
        </svg>

        <!-- Microsoft text -->
        <div class="xp-text-wrap">
          <span class="xp-microsoft">Microsoft</span>
          <div class="xp-windows-row">
            <span class="xp-windows">Windows</span>
            <span class="xp-xp">XP</span>
          </div>
          <span class="xp-edition">Professional</span>
        </div>
      </div>

      <!-- Loading bar -->
      <div class="xp-loader-wrap" :class="{ 'xp-loader-wrap--in': entered }">
        <div class="xp-loader-track">
          <div class="xp-loader-segments">
            <div class="xp-segment" />
            <div class="xp-segment" />
            <div class="xp-segment" />
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <p class="xp-copyright" :class="{ 'xp-copyright--in': entered }">
        Copyright © Microsoft Corporation
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.xp-boot {
  background: #000;
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
}

/* Logo + text block */
.xp-logo {
  display: flex;
  align-items: center;
  gap: 18px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}
.xp-logo--in {
  opacity: 1;
  transform: translateY(0);
}

.xp-text-wrap {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.xp-microsoft {
  font-size: 13px;
  font-weight: 400;
  color: #c8c8c8;
  letter-spacing: 0.04em;
  margin-bottom: 2px;
}

.xp-windows-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.xp-windows {
  font-size: 36px;
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
}

.xp-xp {
  font-size: 36px;
  font-weight: 700;
  color: #e8820c;
  font-style: italic;
}

.xp-edition {
  font-size: 13px;
  font-weight: 400;
  color: #c8c8c8;
  font-style: italic;
  margin-top: 3px;
  letter-spacing: 0.03em;
}

/* Loading bar */
.xp-loader-wrap {
  position: absolute;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.5s ease 0.7s;
}
.xp-loader-wrap--in {
  opacity: 1;
}

.xp-loader-track {
  width: 150px;
  height: 14px;
  border: 1px solid #444;
  border-radius: 2px;
  background: #000;
  overflow: hidden;
  position: relative;
}

.xp-loader-segments {
  display: flex;
  gap: 4px;
  position: absolute;
  left: 0;
  top: 2px;
  bottom: 2px;
  animation: xp-slide 1.4s linear infinite;
}

.xp-segment {
  width: 28px;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #4ea0e8 0%, #1c72c0 50%, #4ea0e8 100%);
  border-radius: 1px;
}

@keyframes xp-slide {
  0%   { transform: translateX(-110px); }
  100% { transform: translateX(160px); }
}

/* Copyright */
.xp-copyright {
  position: absolute;
  bottom: 40px;
  font-size: 11px;
  color: #555;
  letter-spacing: 0.02em;
  opacity: 0;
  transition: opacity 0.5s ease 1s;
}
.xp-copyright--in {
  opacity: 1;
}

/* Exit transition */
.xp-fade-leave-active {
  transition: opacity 0.5s ease;
}
.xp-fade-leave-to {
  opacity: 0;
}
</style>
