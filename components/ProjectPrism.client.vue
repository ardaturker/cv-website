<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { CanvasTexture, CylinderGeometry, LinearFilter, Mesh, MeshStandardMaterial, Raycaster, SRGBColorSpace, Vector2 } from 'three'
import type { Camera, Object3D } from 'three'
import type { Project } from '~/types'

const props = defineProps<{
  projects: Project[]
  selected: number
}>()

const emit = defineEmits<{
  /** A face was tapped: open that project. */
  select: [index: number]
  /** The face now turned towards the viewer, or -1 when it carries no project. */
  facing: [index: number]
}>()

/*
 * A hexagonal prism, one project per upright side face, turning on its axis.
 *
 * This started as a cube, which has exactly six faces and looked like the
 * obvious fit — but two of those six are the top and bottom. The camera holds a
 * fixed elevation while the view rotates, so a cube's top face never squares up
 * to the viewer and its bottom face is never visible at all: two of the six
 * projects could not be reached or read. Standing the faces up around an axis
 * fixes that. All six come past the viewer in turn, upright and equal, and each
 * one lands about 180px wide in the panel against roughly 110px for a cube
 * face, so the pictures actually read.
 */
const SIDES = 6

/** Circumradius, which for a regular hexagon is also the face width. */
const RADIUS = 1
/** Slightly taller than a face is wide, so each face reads as a card. */
const HEIGHT = 1.25

/**
 * One texture carries all six faces side by side, because CylinderGeometry
 * gives the whole side wall a single material group — it cannot take six
 * materials the way a box can. Its side UVs run 0..1 once around the
 * circumference, so a strip of six equal panels lands one per face exactly.
 *
 * Kept under 2048px in both directions: that is the smallest maximum texture
 * size still in the wild, and a strip six panels wide reaches it quickly.
 */
const PANEL_W = 340
const PANEL_H = Math.round(PANEL_W * (HEIGHT / RADIUS))

/** Distinct enough to tell apart at a glance, all legible on the dark ground. */
const FACE_COLORS = [
  '#2f9bff', // accent blue
  '#21c2a4', // teal
  '#5fb85f', // green
  '#e0a355', // amber
  '#e2705f', // coral
  '#8b7ff0', // violet
]

/**
 * Keeps the view in a band where the faces stay upright and readable: never so
 * high that the top cap swallows them, and never below the horizon, where the
 * bottom cap would come into view.
 */
const MIN_POLAR = Math.PI * 0.32
const MAX_POLAR = Math.PI * 0.5

const faceProjects = computed(() =>
  Array.from({ length: SIDES }, (_, i) => props.projects[i] ?? null),
)

const texture = shallowRef<CanvasTexture | null>(null)
const materials = shallowRef<MeshStandardMaterial[]>([])
// Assembled in JS and handed to <primitive>: declaring the geometry and a
// multi-material array in the template renders nothing at all here.
const prism = shallowRef<Mesh | null>(null)
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

/* ---------------------------------------------------------------------------
 * Face artwork
 *
 * To put a picture on a project's face, give that project a `faceImage` in
 * `data/projects.ts`. Without one the face falls back to the project's `image`,
 * and without either it stays a flat accent colour. Paths are public URLs —
 * anything under `public/` is served from `/`, so a file saved at
 * `public/projects/thesis.png` is written `faceImage: '/projects/thesis.png'`.
 *
 * `faceImageFit` chooses how the picture fills the face:
 *   'cover'   (default) centre-crops it to fill edge to edge — best for photos.
 *   'contain' fits the whole picture inside the face and pads with the accent
 *             colour — best for logos, diagrams and screenshots that must not
 *             be cropped.
 *
 * Faces are slightly taller than wide, so portrait-ish art needs the least
 * cropping. Every face keeps its label and accent bar drawn on top of the
 * picture, so busy artwork still reads.
 * ------------------------------------------------------------------------- */

/**
 * Decoded face artwork, keyed by URL. A key whose value is null is either still
 * loading or has failed — both draw as a plain colour face, and a successful
 * load swaps the image in and re-bakes. Presence of the key is what stops the
 * same URL being requested twice.
 */
const images = new Map<string, HTMLImageElement | null>()

/** The picture a project wants on its face, if any. */
function faceImageSrc(project: Project | null): string | null {
  return project?.faceImage ?? project?.image ?? null
}

/**
 * Starts any face artwork that hasn't been requested yet. Each URL is fetched
 * once and re-bakes the strip on arrival, so faces show as flat colour first
 * and fill in a moment later instead of blocking the first frame.
 */
function loadFaceImages() {
  for (const project of faceProjects.value) {
    const src = faceImageSrc(project)
    if (!src || images.has(src)) continue

    images.set(src, null)
    const img = new Image()
    // Same-origin art is unaffected; for anything cross-origin this turns a
    // missing CORS header into a failed load rather than a tainted canvas,
    // which would throw when three.js uploads it as a texture.
    img.crossOrigin = 'anonymous'
    img.decoding = 'async'
    img.onload = () => {
      images.set(src, img)
      build()
    }
    // On error the entry stays null and the face keeps its accent colour.
    img.src = src
  }
}

/** Centre-crops the image so it fills the whole panel. */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
}

/** Fits the whole image inside the panel, leaving the accent colour as a mat. */
function drawContain(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const scale = Math.min((w * 0.84) / img.naturalWidth, (h * 0.84) / img.naturalHeight)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
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

/** Draws one project into its slot of the strip. */
function drawPanel(
  ctx: CanvasRenderingContext2D,
  x0: number,
  project: Project | null,
  color: string,
  isSelected: boolean,
) {
  const W = PANEL_W
  const H = PANEL_H

  ctx.save()
  ctx.translate(x0, 0)
  // Clipped so a wide picture can never spill into the neighbouring face.
  ctx.beginPath()
  ctx.rect(0, 0, W, H)
  ctx.clip()

  if (!project) {
    // Spare face: a seventh project, or just a picture, can still go here.
    ctx.fillStyle = '#111a24'
    ctx.fillRect(0, 0, W, H)
    ctx.restore()
    return
  }

  const src = faceImageSrc(project)
  const img = src ? images.get(src) ?? null : null

  // The accent colour goes down first either way: it is the whole face when
  // there is no picture, and the mat behind a 'contain' picture when there is.
  ctx.fillStyle = color
  ctx.fillRect(0, 0, W, H)

  if (img) {
    if (project.faceImageFit === 'contain') drawContain(ctx, img, W, H)
    else drawCover(ctx, img, W, H)

    // Scrim: dark where the type sits, lighter across the middle so the picture
    // still reads as a picture rather than a tinted block.
    const scrim = ctx.createLinearGradient(0, 0, 0, H)
    scrim.addColorStop(0, 'rgba(7,11,16,.85)')
    scrim.addColorStop(0.38, 'rgba(7,11,16,.46)')
    scrim.addColorStop(1, 'rgba(7,11,16,.85)')
    ctx.fillStyle = scrim
    ctx.fillRect(0, 0, W, H)
  }
  else {
    // Slight vertical shading so the flat colour reads as a surface, not a swatch.
    const grad = ctx.createLinearGradient(0, 0, 0, H)
    grad.addColorStop(0, 'rgba(255,255,255,.10)')
    grad.addColorStop(1, 'rgba(0,0,0,.20)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
  }

  ctx.textAlign = 'center'

  // Type sits over artwork of unknown brightness, so it carries its own shadow.
  if (img) {
    ctx.shadowColor = 'rgba(0,0,0,.9)'
    ctx.shadowBlur = 14
  }

  // Kind · level, mirroring the sub-label in the text list.
  ctx.font = '500 17px "IBM Plex Mono", ui-monospace, monospace'
  ctx.fillStyle = 'rgba(255,255,255,.86)'
  ctx.fillText(`${project.kind} · ${project.level}`.toUpperCase(), W / 2, 46)

  // Title, wrapped. A face is read at roughly 180px wide on screen, so 40px
  // here lands near 21px there — the longest title runs to four lines.
  ctx.font = '700 40px "Archivo Narrow", Archivo, sans-serif'
  ctx.fillStyle = '#ffffff'
  const lines = wrap(ctx, project.title, W - 44).slice(0, 5)
  const lineHeight = 45
  let y = H / 2 - ((lines.length - 1) * lineHeight) / 2 + 10
  for (const l of lines) {
    ctx.fillText(l, W / 2, y)
    y += lineHeight
  }

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0

  // A bar in the face's own colour, so faces stay tellable apart once pictures
  // cover the flat backdrop that used to do that job.
  ctx.fillStyle = color
  ctx.fillRect(0, H - 12, W, 12)

  // Selected face gets a bright inset rule.
  if (isSelected) {
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 8
    ctx.strokeRect(4, 4, W - 8, H - 8)
  }

  ctx.restore()
}

function buildTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = PANEL_W * SIDES
  canvas.height = PANEL_H
  const ctx = canvas.getContext('2d')!

  faceProjects.value.forEach((p, i) => {
    drawPanel(ctx, i * PANEL_W, p, FACE_COLORS[i], !!p && props.projects.indexOf(p) === props.selected)
  })

  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  // No mipmaps: the lower levels would blend neighbouring panels into each
  // other along the face edges. The strip is displayed at close to 1:1 anyway.
  tex.generateMipmaps = false
  tex.minFilter = LinearFilter
  tex.magFilter = LinearFilter
  return tex
}

function build() {
  texture.value?.dispose()
  materials.value.forEach(m => m.dispose())

  texture.value = buildTexture()

  // CylinderGeometry's three material groups, in order: side wall, top cap,
  // bottom cap. Only the wall carries projects.
  materials.value = [
    new MeshStandardMaterial({ map: texture.value, roughness: 0.62, metalness: 0, flatShading: true }),
    new MeshStandardMaterial({ color: '#0c141d', roughness: 0.85, metalness: 0, flatShading: true }),
    new MeshStandardMaterial({ color: '#0b1219', roughness: 0.85, metalness: 0, flatShading: true }),
  ]

  if (prism.value) {
    prism.value.material = materials.value
  }
  else {
    prism.value = new Mesh(
      new CylinderGeometry(RADIUS, RADIUS, HEIGHT, SIDES, 1, false),
      materials.value,
    )
    // Viewed from above, the top cap adds silhouette that the geometric centre
    // knows nothing about, which leaves the shape sitting low in the frame.
    // Lifting it centres what the eye actually sees. The spin axis is vertical
    // through the origin either way, so this does not affect the turn.
    prism.value.position.y = 0.12
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

let cachedCamera: Camera | undefined

/**
 * The ray must start from wherever OrbitControls has moved the camera to, so we
 * need the live camera object. Reading it out of the scene graph avoids depending
 * on the shape of the Tres context, which differs between useTres and
 * useTresContext and gave back no camera at all here. Memoised, because the
 * facing poll below would otherwise walk the graph on every tick.
 */
function activeCamera(): Camera | undefined {
  if (cachedCamera) return cachedCamera
  if (!prism.value) return undefined

  let root: Object3D = prism.value
  while (root.parent) root = root.parent
  root.traverse((o) => {
    if (!cachedCamera && (o as Camera & { isCamera?: boolean }).isCamera) cachedCamera = o as Camera
  })
  return cachedCamera
}

/** Outward normal of side face `i`, in the XZ plane. */
function faceNormal(i: number): { x: number, z: number } {
  // CylinderGeometry lays its side out from theta 0 with x = r·sin θ and
  // z = r·cos θ, one segment per face, so face i is centred half a segment in.
  const theta = ((i + 0.5) / SIDES) * Math.PI * 2
  return { x: Math.sin(theta), z: Math.cos(theta) }
}

/** Which side face is squarest to the viewer right now. */
function frontFace(cam: Camera): number {
  const len = Math.hypot(cam.position.x, cam.position.z) || 1
  const dx = cam.position.x / len
  const dz = cam.position.z / len

  let front = 0
  let best = -Infinity
  for (let i = 0; i < SIDES; i++) {
    const n = faceNormal(i)
    const dot = dx * n.x + dz * n.z
    if (dot > best) {
      best = dot
      front = i
    }
  }
  return front
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
  if (!prism.value) return
  const cam = activeCamera()
  if (!cam) return

  const canvas = wrapper.value?.querySelector('canvas')
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(ndc, cam)
  const hit = raycaster.intersectObject(prism.value, false)[0]
  // Material group 0 is the side wall; the caps carry no project.
  if (!hit || !hit.uv || hit.face?.materialIndex !== 0) return

  // The wall's u runs 0..1 once around, one panel per face.
  const index = Math.min(SIDES - 1, Math.floor(hit.uv.x * SIDES))
  const project = faceProjects.value[index]
  if (project) emit('select', props.projects.indexOf(project))
}

/**
 * Reports which face is turned towards the viewer, so the project list can
 * highlight the name belonging to the picture currently on show. Polled rather
 * than watched, because nothing in Vue's reactive graph changes when
 * OrbitControls turns the view.
 */
const FACING_POLL_MS = 100

/** Last reported front face, so an unchanged view emits nothing. */
let facingFace = -1
let facingRaf = 0
let facingPolledAt = 0

function trackFacing(now: number) {
  facingRaf = requestAnimationFrame(trackFacing)

  // A face holds the front for several seconds at the auto-rotate speed, so ten
  // polls a second is already far finer than the eye needs.
  if (now - facingPolledAt < FACING_POLL_MS) return
  facingPolledAt = now

  const cam = activeCamera()
  if (!cam) return

  const front = frontFace(cam)
  if (front === facingFace) return
  facingFace = front

  const project = faceProjects.value[front]
  emit('facing', project ? props.projects.indexOf(project) : -1)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  dpr.value = Math.min(window.devicePixelRatio || 1, 1.75)
  if (!hasWebGL()) {
    failed.value = true
    return
  }

  // Bake once straight away so the prism is never invisible, then re-bake when
  // the webfonts arrive so the labels aren't stuck in a fallback face. Awaiting
  // fonts before the first bake would leave it blank if that promise never
  // settles.
  build()
  loadFaceImages()
  document.fonts?.ready.then(build).catch(() => {})

  facingRaf = requestAnimationFrame(trackFacing)
})

watch(() => props.selected, () => {
  if (failed.value) return
  build()
})

// Editing a project's artwork or reordering the list re-requests and re-bakes.
watch(faceProjects, () => {
  if (failed.value) return
  loadFaceImages()
  build()
})

onUnmounted(() => {
  cancelAnimationFrame(facingRaf)
  texture.value?.dispose()
  materials.value.forEach(m => m.dispose())
  prism.value?.geometry.dispose()
})
</script>

<template>
  <div
    v-if="!failed"
    ref="wrapper"
    class="relative w-full h-[clamp(220px,50vw,300px)] bg-stat-panel-foot cursor-grab active:cursor-grabbing"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <TresCanvas alpha antialias :dpr="dpr" render-mode="always">
      <!-- Held at about 12 degrees above the faces: enough for the top cap to
           read as a solid rather than a flat strip of cards, not so much that
           it becomes the biggest thing in the frame. Looking down that far also
           makes the silhouette taller — the cap adds 2·sin(elevation) on top of
           the prism's own 1.25 — so the distance here leaves the whole thing at
           about 80% of the frame instead of touching top and bottom. -->
      <TresPerspectiveCamera make-default :position="[0, 1.06, 4.99]" :fov="28" />
      <OrbitControls
        make-default
        :enable-zoom="false"
        :enable-pan="false"
        :min-polar-angle="MIN_POLAR"
        :max-polar-angle="MAX_POLAR"
        :auto-rotate="!reduceMotion"
        :auto-rotate-speed="1.1"
      />

      <TresAmbientLight :intensity="2.2" color="#ffffff" />
      <TresDirectionalLight :position="[4, 5, 3]" :intensity="1.8" color="#ffffff" />
      <TresDirectionalLight :position="[-4, 1, -3]" :intensity="1.2" color="#9ecbff" />

      <primitive v-if="prism" :object="prism" />
    </TresCanvas>
  </div>

  <!-- No WebGL. The picker panel still needs its picture area filled rather
       than collapsed onto the name list below. -->
  <div
    v-else
    class="w-full h-[clamp(220px,50vw,300px)] flex items-end p-4"
    style="background-image: repeating-linear-gradient(135deg, #111a24 0 12px, #0d151d 12px 24px)"
  >
    <span class="font-mono text-[10.5px] tracking-[.14em] text-stat-ink-mono">3D NOT AVAILABLE</span>
  </div>
</template>
