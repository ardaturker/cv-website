<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  Box3,
  BufferAttribute,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three'
import type { Material } from 'three'

const props = withDefaults(defineProps<{
  /** Path to the GLB. Swap this to change the character. */
  model?: string
  /** Shown before the model loads, and instead of it if 3D can't run. */
  poster: string
  alt?: string
  /**
   * Degrees to turn the model about Y so it faces the camera. Photogrammetry
   * scans come out facing an arbitrary direction; the current scan already
   * faces +Z, which is where the camera sits, so this is 0. Swap the model and
   * this is the one knob likely to need changing.
   */
  yaw?: number
  /**
   * 'gta' applies the posterised ink-illustration treatment; 'plain' shows the
   * scan as captured.
   */
  look?: 'gta' | 'plain'
}>(), {
  model: '/models/character.glb',
  alt: '',
  yaw: 0,
  look: 'gta',
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
 * The GTA V look, which is an ink-and-marker illustration rather than a
 * photograph: flat blocks of colour instead of smooth gradients, pushed
 * saturation, crushed contrast and a warm grade.
 *
 * The game's black silhouette line is deliberately absent. An inverted-hull
 * outline is the cheap way to draw one, but this panel's ground is near-black,
 * so the line cannot read against it — it only cost a second pass over every
 * triangle. Interior ink lines would need an edge-detect post-process with its
 * own depth pass, and on a photogrammetry mesh those lines land on scan noise
 * as readily as on features.
 *
 * Injected into MeshBasicMaterial's own shader instead of replacing it with a
 * ShaderMaterial, so three keeps handling texture decode and output colour
 * space; a hand-rolled shader has to redo both and gets it subtly wrong.
 */
const GTA = {
  /** Tonal steps per channel. Low is posterised; high approaches the photo. */
  levels: 6,
  saturation: 1.28,
  contrast: 1.16,
  /** Warm highlights, slightly cool blues — the game's colour grade. */
  tint: [1.06, 1.0, 0.94],
}

function applyGtaGrade(material: MeshBasicMaterial) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uLevels = { value: GTA.levels }
    shader.uniforms.uSaturation = { value: GTA.saturation }
    shader.uniforms.uContrast = { value: GTA.contrast }
    shader.uniforms.uTint = { value: new Vector3(...GTA.tint) }

    shader.fragmentShader = shader.fragmentShader
      .replace(
        'void main() {',
        `uniform float uLevels;
         uniform float uSaturation;
         uniform float uContrast;
         uniform vec3 uTint;
         void main() {`,
      )
      // After map_fragment, diffuseColor holds the decoded texel in linear
      // space. The grade runs in approximate sRGB, because posterising and
      // saturation are perceptual operations and banding in linear space
      // bunches every step up in the highlights.
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
         {
           vec3 c = pow(max(diffuseColor.rgb, 0.0), vec3(1.0 / 2.2));
           float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
           c = mix(vec3(luma), c, uSaturation);
           c = (c - 0.5) * uContrast + 0.5;
           c *= uTint;
           c = clamp(c, 0.0, 1.0);
           c = floor(c * uLevels + 0.5) / uLevels;
           diffuseColor.rgb = pow(c, vec3(2.2));
         }`,
      )
  }
  // Distinguishes this program from an ungraded MeshBasicMaterial in three's
  // shader cache, which keys on material type and defines alone.
  material.customProgramCacheKey = () => 'gta-grade'
  material.needsUpdate = true
}

/**
 * Make a loaded scan renderable, whichever way it was exported, then style it.
 *
 * Scan exports vary in two ways that both render wrong if ignored:
 *  - Colour may live in a texture (with a material) or in a COLOR_0 vertex
 *    attribute (often with no material at all). Vertex colours are ignored
 *    unless the material opts in, so an untextured scan comes out plain white.
 *  - Normals are frequently absent, which leaves lit materials flat-shaded and
 *    faceted.
 *
 * Scan colour already has the capture's lighting baked in, so it is shown unlit
 * rather than lit a second time — matching what a KHR_materials_unlit export
 * asks for explicitly.
 */
function prepare(group: Group, styled: boolean) {
  group.traverse((child) => {
    const mesh = child as Mesh
    const geometry = mesh.isMesh ? mesh.geometry : undefined
    if (!geometry) return
    if (!geometry.getAttribute('normal')) geometry.computeVertexNormals()

    const colours = geometry.getAttribute('color')

    // glTF declares COLOR_0 to be linear, but scan exporters routinely write
    // 8-bit sRGB values into it. Fed to the renderer as linear those come out
    // washed and over-contrasted, so 8-bit colour is converted on the way in.
    if (colours && !(colours.array instanceof Float32Array)) {
      const linear = new Float32Array(colours.count * 3)
      const c = new Color()
      for (let i = 0; i < colours.count; i++) {
        c.setRGB(colours.getX(i), colours.getY(i), colours.getZ(i)).convertSRGBToLinear()
        linear[i * 3] = c.r
        linear[i * 3 + 1] = c.g
        linear[i * 3 + 2] = c.b
      }
      geometry.setAttribute('color', new BufferAttribute(linear, 3))
    }

    // A vertex-coloured scan usually arrives with no material at all, and any
    // material it does have ignores COLOR_0 unless told to use it.
    const previous = mesh.material as Material & { map?: unknown }
    const material = new MeshBasicMaterial({
      vertexColors: !!colours,
      map: (previous?.map as MeshBasicMaterial['map']) ?? null,
    })
    mesh.material = material
    previous?.dispose?.()

    if (styled) applyGtaGrade(material)
  })
}

/**
 * Horizontal centre of the geometry between two heights.
 *
 * Centring the crop on the full bounding box pulls the head off to one side,
 * because shoulders are wider than a head and rarely symmetric in a scan. So
 * the head's own band of geometry decides the horizontal centre.
 */
function centreOfBand(group: Group, minY: number, maxY: number): Vector3 | null {
  group.updateWorldMatrix(true, true)
  const v = new Vector3()
  let x = 0
  let z = 0
  let n = 0

  group.traverse((child) => {
    const mesh = child as Mesh
    const pos = mesh.isMesh ? mesh.geometry?.getAttribute('position') : undefined
    if (!pos) return
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld)
      if (v.y < minY || v.y > maxY) continue
      x += v.x
      z += v.z
      n++
    }
  })

  return n ? new Vector3(x / n, 0, z / n) : null
}

/**
 * Normalise and frame the model.
 *
 * Photogrammetry scans arrive at arbitrary scale with an arbitrary origin, so
 * nothing here may assume metres or a subject standing at y=0. The chosen slice
 * is scaled to one unit and centred on the origin, which is what the fixed
 * camera looks at.
 */
function frame(group: Group) {
  const box = new Box3().setFromObject(group)
  const size = box.getSize(new Vector3())
  const height = size.y || 1

  // Slenderness separates a bust (~1-1.6) from a standing figure (~3-4).
  const girth = Math.max(size.x, size.z) || height
  const isBust = height / girth < 2.2

  // Portion of the model, measured down from the crown, that fills the frame.
  // A bust keeps most of itself; a standing figure crops to head and shoulders.
  const slice = height * (isBust ? 0.72 : 0.3)
  const top = box.max.y
  const bottom = top - slice

  const centre = centreOfBand(group, bottom, top) ?? box.getCenter(new Vector3())

  // Scale that slice to 1 unit and put its centre on the origin, where the
  // fixed camera and the orbit target both look.
  const k = 1 / slice
  group.scale.setScalar(k)
  group.position.set(-centre.x * k, -((top + bottom) / 2) * k, -centre.z * k)
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

    // Yaw goes on the model and the framing transform on a wrapper, so the
    // centring offset isn't itself rotated out of position.
    gltf.scene.rotation.y = (props.yaw * Math.PI) / 180
    const pivot = new Group()
    pivot.add(gltf.scene)

    prepare(pivot, props.look === 'gta')
    frame(pivot)
    scene.value = pivot
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

        <!--
          The scan's material declares KHR_materials_unlit, so three renders it
          as MeshBasicMaterial and these lights do nothing to it — a
          photogrammetry texture already has real lighting baked in, and lighting
          it again would double up. They are kept modest so that a future lit
          model (a sculpt or a commission) still shows up rather than rendering
          black, with the accent used only as a faint rim.
        -->
        <TresAmbientLight :intensity="1.4" color="#ffffff" />
        <TresDirectionalLight :position="[2, 3, 3]" :intensity="2" color="#ffffff" />
        <TresDirectionalLight :position="[-3, 2, -2]" :intensity="1.2" color="#2f9bff" />

        <primitive v-if="scene" :object="scene" />
      </TresCanvas>
    </div>
  </div>
</template>
