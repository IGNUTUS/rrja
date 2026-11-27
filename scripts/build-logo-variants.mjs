/**
 * Builds transparent logo variants from the client-supplied logo (navy/orange artwork on white).
 *
 *   rrja-logo-color-*      original colours, white background removed  -> for light backgrounds
 *   rrja-logo-reverse-*    navy elements turned white, orange/light-blue kept -> for dark backgrounds
 *
 * Background removal uses "colour-to-alpha" against white, applied only to near-white pixels and the
 * anti-aliased edges next to them, so solid artwork stays fully opaque and edges stay clean on any background.
 *
 * Usage: node scripts/build-logo-variants.mjs [path-to-master.png]
 * Default master: public/assets/rrja/logo/rrja-logo-original.png
 */
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const outDir = new URL('../public/assets/rrja/logo/', import.meta.url)
const master = process.argv[2] ?? fileURLToPath(new URL('rrja-logo-original.png', outDir))

// 1. Trim the white margin and get raw RGB pixels
const trimmed = await sharp(master).flatten({ background: '#ffffff' }).trim({ background: '#ffffff', threshold: 18 }).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = trimmed.info
const src = trimmed.data // RGB
const N = W * H

// 2. Near-white mask, dilated by 2px to catch anti-aliased edges
const white = new Uint8Array(N)
for (let i = 0; i < N; i++) {
  const r = src[i * 3], g = src[i * 3 + 1], b = src[i * 3 + 2]
  if (Math.min(r, g, b) > 232) white[i] = 1
}
const near = new Uint8Array(N)
const R = 2
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!white[y * W + x]) continue
    for (let dy = -R; dy <= R; dy++) {
      const yy = y + dy
      if (yy < 0 || yy >= H) continue
      for (let dx = -R; dx <= R; dx++) {
        const xx = x + dx
        if (xx >= 0 && xx < W) near[yy * W + xx] = 1
      }
    }
  }
}

// 3. Colour-to-alpha (white) on near-white pixels and edges
const color = Buffer.alloc(N * 4)
for (let i = 0; i < N; i++) {
  let r = src[i * 3], g = src[i * 3 + 1], b = src[i * 3 + 2]
  let a = 255
  if (near[i] || Math.min(r, g, b) > 200) {
    const af = Math.max(255 - r, 255 - g, 255 - b) / 255
    if (af < 0.02) {
      a = 0
    } else {
      r = Math.round(Math.max(0, Math.min(255, (r - 255 * (1 - af)) / af)))
      g = Math.round(Math.max(0, Math.min(255, (g - 255 * (1 - af)) / af)))
      b = Math.round(Math.max(0, Math.min(255, (b - 255 * (1 - af)) / af)))
      a = Math.round(af * 255)
    }
  }
  color[i * 4] = r; color[i * 4 + 1] = g; color[i * 4 + 2] = b; color[i * 4 + 3] = a
}

// 4. Reverse variant: dark/navy blues -> white; orange, light blue and other colours untouched
const rgb2hsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h * 60, s, l]
}
const hsl2rgb = (h, s, l) => {
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}
const reverse = Buffer.from(color)
for (let i = 0; i < N; i++) {
  const a = reverse[i * 4 + 3]
  if (a === 0) continue
  const [h, s, l] = rgb2hsl(reverse[i * 4], reverse[i * 4 + 1], reverse[i * 4 + 2])
  const blue = h >= 185 && h <= 250 && s > 0.12
  const darkNeutral = s <= 0.12 && l < 0.35 // near-black shadows/text
  if (!blue && !darkNeutral) continue
  // t = how "navy" the pixel is: 1 for deep navy, fading to 0 for mid/light blues (the swooshes)
  const t = Math.max(0, Math.min(1, (0.56 - l) / 0.3))
  if (t === 0) continue
  const nl = l + t * (0.97 - l)
  const ns = s * (1 - 0.88 * t)
  const [r, g, b] = hsl2rgb(h, ns, nl)
  reverse[i * 4] = r; reverse[i * 4 + 1] = g; reverse[i * 4 + 2] = b
}

// 5. Write outputs
const out = (name) => fileURLToPath(new URL(name, outDir))
for (const [name, buf] of [['color', color], ['reverse', reverse]]) {
  const img = sharp(buf, { raw: { width: W, height: H, channels: 4 } })
  await img.clone().png({ compressionLevel: 9 }).toFile(out(`rrja-logo-${name}.png`))
  for (const h of [96, 192]) {
    await img.clone().resize({ height: h }).webp({ quality: 92, alphaQuality: 100 }).toFile(out(`rrja-logo-${name}-${h}.webp`))
  }
}
console.log(`logo variants written (${W}x${H})`)
