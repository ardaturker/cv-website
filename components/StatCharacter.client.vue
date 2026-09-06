<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Box3, Vector3 } from 'three'
import type { Group } from 'three'

const props = withDefaults(defineProps<{
  /** Path to the GLB. Swap this to change the character. */
  model?: string
  /** Shown before the model loads, and instead of it if 3D can't run. */
  poster: string
  alt?: string
}>(), {
  model: '/models/character.glb',
  alt: '',
})

const root = ref<HTMLElement | null>(null)
// shallowRef: the loaded scene graph must not be made deeply reactive.
const scene = shallowRef<Group | null>(null)
const failed = ref(false)
const reduceMotion = ref(false)
const dpr = ref(1)

/**
 * The camera is fixed and the model is fitted to it, never the other way round:
 * OrbitControls owns the camera transform once attached, so any position we set
 * reactively would be overwritten on the next update.
 *
 * At fov 30 the visible height here is 2 * 2.4 * tan(15°) ≈ 1.29, so a subject
 * normalised to 1.0 unit sits at ~78% of frame height with margin on all sides.
 */
const CAMERA_POS: [number, number, number] = [0, 0, 2.4]
const ORIGIN: [number, number, number] = [0, 0, 0]

const ready = computed(() => !!scene.value && !failed.value)

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  }
  catch {
    return false
  }
}

/**
 * Normalise then frame the model.
 *
 * Photogrammetry scans arrive at arbitrary scale and with an arbitrary origin,
 * so nothing here may assume metres or a model standing at y=0. We rescale to a
 * unit height, recentre, then frame according to what the mesh actually is: a
 * head/bust gets framed whole, a full figure gets framed chest-up.
 */
function frame(group: Group) {
  const box = new Box3().setFromObject(group)
  const size = box.getSize(new Vector3())
  const height = size.y || 1
  const centre = box.getCenter(new Vector3())

  // Slenderness separates a bust (~1-1.6) from a standing figure (~3-4).
  const girth = Math.max(size.x, size.z) || height
  const isBust = height / girth < 2.2

  // The slice of the model that should fill the frame: all of a bust, or the
  // top third of a standing figure so it reads head-and-shoulders.
  const slice = isBust ? height : height * 0.3
  const sliceCentreY = box.max.y - slice / 2

  // Scale that slice to 1 unit and move its centre onto the origin, which is
  // where the fixed camera and the orbit target both look.
  const k = 1 / slice
  group.scale.setScalar(k)
  group.position.set(-centre.x * k, -sliceCentreY * k, -centre.z * k)
}

onMounted(async () => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  dpr.value = Math.min(window.devicePixelRatio || 1, 1.75)

  if (!hasWebGL()) {
    failed.value = true
    return
  }

  try {
    const gltf = await new GLTFLoader().loadAsync(props.model)
    frame(gltf.scene)
    scene.value = gltf.scene
  }
  catch {
    // No model yet, 404, or a corrupt file — fall back to the photo.
    failed.value = true
  }
})
</script>

<template>
  <div ref="root" class="relative w-full h-full overflow-hidden">
    <!-- Poster: carries the panel until the model is up, and permanently if it can't load. -->
    <img
      :src="props.poster"
      :alt="props.alt"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      :class="ready ? 'opacity-0' : 'opacity-100'"
    >

    <div
      v-if="!failed"
      aria-hidden="true"
      class="absolute inset-0 transition-opacity duration-700"
      :class="ready ? 'opacity-100' : 'opacity-0'"
    >
      <!--
        render-mode must stay "always". Switching it to "manual" when the panel
        scrolls out of view does save work, but TresCanvas seeds its frame
        counter from the initial mode and the canvas then never renders again —
        it freezes silently rather than erroring. The whole section is behind
        hydrate-on-visible, so nothing runs until the panel is approached.
      -->
      <TresCanvas
        alpha
        antialias
        :dpr="dpr"
        render-mode="always"
        power-preference="high-performance"
      >
        <TresPerspectiveCamera make-default :position="CAMERA_POS" :fov="30" />
        <OrbitControls
          make-default
          :target="ORIGIN"
          :enable-zoom="false"
          :enable-pan="false"
          :auto-rotate="!reduceMotion"
          :auto-rotate-speed="0.9"
          :min-polar-angle="1.15"
          :max-polar-angle="1.85"
        />

        <!-- Lighting keyed to the stat-screen palette. -->
        <TresAmbientLight :intensity="1.1" color="#8fa8c4" />
        <TresDirectionalLight :position="[2, 3, 3]" :intensity="2.4" color="#ffffff" />
        <TresDirectionalLight :position="[-3, 2, -2]" :intensity="3.2" color="#2f9bff" />
        <TresPointLight :position="[0, 1.2, 2]" :intensity="2" color="#c6d3e1" />

        <primitive v-if="scene" :object="scene" />
      </TresCanvas>
    </div>
  </div>
</template>
