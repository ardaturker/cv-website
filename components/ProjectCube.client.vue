<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { BoxGeometry, CanvasTexture, Mesh, MeshStandardMaterial, Raycaster, SRGBColorSpace, Vector2 } from 'three'
import type { Camera, Object3D } from 'three'
import type { Project } from '~/types'

const props = defineProps<{
  projects: Project[]
  selected: number
}>()

const emit = defineEmits<{ select: [index: number] }>()

/**
 * Face order matches BoxGeometry's material groups:
 * 0:+X  1:-X  2:+Y  3:-Y  4:+Z  5:-Z
 * One project per face, so six is the natural capacity.
 */
const FACES = 6

/** Distinct enough to tell apart at a glance, all legible on the dark ground. */
const FACE_COLORS = [
  '#2f9bff', // accent blue
  '#21c2a4', // teal
  '#5fb85f', // green
  '#e0a355', // amber
  '#e2705f', // coral
  '#8b7ff0', // violet
]

const faceProjects = computed(() =>
  Array.from({ length: FACES }, (_, i) => props.projects[i] ?? null),
)

const textures = shallowRef<CanvasTexture[]>([])
const materials = shallowRef<MeshStandardMaterial[]>([])
// The mesh is assembled in JS and handed to <primitive>, the same route the
// portrait viewer uses. Declaring it as <TresMesh><TresBoxGeometry/></TresMesh>
// with a six-material array renders nothing at all here.
const cube = shallowRef<Mesh | null>(null)
const failed = ref(false)
const reduceMotion = ref(false)
const dpr = ref(1)

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  }
  catch { return false }
}

/** Greedy word wrap that also hard-splits any single word too long for the line. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const attempt = line ? `${line} ${word}` : word
    if (ctx.measureText(attempt).width <= maxWidth || !line) {
      line = attempt
    }
    else {
      lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines
}

function drawFace(project: Project | null, color: string, isSelected: boolean): CanvasTexture {
  const S = 512
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = S
  const ctx = canvas.getContext('2d')!

  if (!project) {
    ctx.fillStyle = '#111a24'
    ctx.fillRect(0, 0, S, S)
  }
  else {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, S, S)

    // Slight vertical shading so the flat colour reads as a surface, not a swatch.
    const grad = ctx.createLinearGradient(0, 0, 0, S)
    grad.addColorStop(0, 'rgba(255,255,255,.10)')
    grad.addColorStop(1, 'rgba(0,0,0,.20)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, S, S)

    ctx.textAlign = 'center'

    // Kind · level, mirroring the sub-label in the text list.
    ctx.font = '500 22px "IBM Plex Mono", ui-monospace, monospace'
    ctx.fillStyle = 'rgba(255,255,255,.78)'
    ctx.fillText(`${project.kind} · ${project.level}`.toUpperCase(), S / 2, 86)

    // Title, wrapped.
    ctx.font = '700 44px "Archivo Narrow", Archivo, sans-serif'
    ctx.fillStyle = '#ffffff'
    const lines = wrap(ctx, project.title, S - 88).slice(0, 5)
    const lineHeight = 50
    let y = S / 2 - ((lines.length - 1) * lineHeight) / 2 + 12
    for (const l of lines) {
      ctx.fillText(l, S / 2, y)
      y += lineHeight
    }

    // Selected face gets a bright inset rule.
    if (isSelected) {
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 10
      ctx.strokeRect(5, 5, S - 10, S - 10)
    }
  }

  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function build() {
  textures.value.forEach(t => t.dispose())
  materials.value.forEach(m => m.dispose())

  textures.value = faceProjects.value.map((p, i) =>
    drawFace(p, FACE_COLORS[i], !!p && props.projects.indexOf(p) === props.selected),
  )
  materials.value = textures.value.map(map =>
    new MeshStandardMaterial({ map, roughness: 0.65, metalness: 0 }),
  )

  if (cube.value) {
    cube.value.material = materials.value
  }
  else {
    cube.value = new Mesh(new BoxGeometry(1.6, 1.6, 1.6), materials.value)
  }
}

/**
 * Face picking is done here rather than with a mesh @click handler: OrbitControls
 * captures the pointer on the canvas, so object click events never fire reliably.
 * We watch for a tap (little movement, short hold) and cast our own ray, which
 * also stops a drag-to-spin from being treated as a pick on release.
 */
const TAP_SLOP_PX = 6
const TAP_MAX_MS = 600

const wrapper = ref<HTMLElement | null>(null)
const raycaster = new Raycaster()
const ndc = new Vector2()

/**
 * The ray must start from wherever OrbitControls has moved the camera to, so we
 * need the live camera object. Reading it out of the scene graph avoids depending
 * on the shape of the Tres context, which differs between useTres and
 * useTresContext and gave back no camera at all here.
 */
function activeCamera(): Camera | undefined {
  let root: Object3D = cube.value!
  while (root.parent) root = root.parent
  let found: Camera | undefined
  root.traverse((o) => {
    if (!found && (o as Camera & { isCamera?: boolean }).isCamera) found = o as Camera
  })
  return found
}

let downX = 0
let downY = 0
let downAt = 0

function onPointerDown(e: PointerEvent) {
  downX = e.clientX
  downY = e.clientY
  downAt = performance.now()
}

function onPointerUp(e: PointerEvent) {
  const moved = Math.hypot(e.clientX - downX, e.clientY - downY)
  if (moved > TAP_SLOP_PX || performance.now() - downAt > TAP_MAX_MS) return
  if (!cube.value) return
  const cam = activeCamera()
  if (!cam) return

  const canvas = wrapper.value?.querySelector('canvas')
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(ndc, cam)
  const index = raycaster.intersectObject(cube.value, false)[0]?.face?.materialIndex
  if (index == null) return

  const project = faceProjects.value[index]
  if (project) emit('select', props.projects.indexOf(project))
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  dpr.value = Math.min(window.devicePixelRatio || 1, 1.75)
  if (!hasWebGL()) {
    failed.value = true
    return
  }

  // Bake once straight away so the cube is never invisible, then re-bake when the
  // webfonts arrive so the labels aren't stuck in a fallback face. Awaiting fonts
  // before the first bake would leave the cube blank if that promise never settles.
  build()
  document.fonts?.ready.then(build).catch(() => {})
})

watch(() => props.selected, build)

onUnmounted(() => {
  textures.value.forEach(t => t.dispose())
  materials.value.forEach(m => m.dispose())
})
</script>

<template>
  <div
    v-if="!failed"
    ref="wrapper"
    class="relative w-full h-[340px] cursor-grab active:cursor-grabbing"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <TresCanvas alpha antialias :dpr="dpr" render-mode="always">
      <!-- Far enough back that the cube's corner-to-corner diagonal (2.77 for a
           1.6 cube) still clears the short 340px frame while it turns. -->
      <TresPerspectiveCamera make-default :position="[3.6, 2.6, 3.6]" :fov="32" />
      <OrbitControls
        make-default
        :enable-zoom="false"
        :enable-pan="false"
        :auto-rotate="!reduceMotion"
        :auto-rotate-speed="1.1"
      />

      <TresAmbientLight :intensity="2.2" color="#ffffff" />
      <TresDirectionalLight :position="[4, 5, 3]" :intensity="1.8" color="#ffffff" />
      <TresDirectionalLight :position="[-4, 1, -3]" :intensity="1.2" color="#9ecbff" />

      <primitive v-if="cube" :object="cube" />
    </TresCanvas>
  </div>
</template>
