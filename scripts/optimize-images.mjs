/**
 * Converts source photos into responsive WebP files under public/assets/rrja/<folder>/.
 *
 * Usage: node scripts/optimize-images.mjs <source-dir>
 *   <source-dir> holds originals named <id>.jpg / .jpeg / .png / .webp, where <id> matches an entry in src/data/images.ts.
 *   The target folder (backgrounds, cargo, shipments...) is read from that registry.
 *
 * Output: <id>-800.webp, <id>-1600.webp, <id>-2400.webp (never upscaled).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const srcDir = process.argv[2]
if (!srcDir) throw new Error('Usage: node scripts/optimize-images.mjs <source-dir>')

const registry = readFileSync(new URL('../src/data/images.ts', import.meta.url), 'utf8')
const folders = Object.fromEntries([...registry.matchAll(/id: '([\w-]+)', folder: '(\w+)'/g)].map((m) => [m[1], m[2]]))
const WIDTHS = [800, 1600, 2400]
const outRoot = new URL('../public/assets/rrja/', import.meta.url)

for (const file of readdirSync(srcDir)) {
  const { name, ext } = parse(file)
  if (!/\.(jpe?g|png|webp)$/i.test(ext)) continue
  const folder = folders[name]
  if (!folder) {
    console.warn(`skip ${file}: no matching id in src/data/images.ts`)
    continue
  }
  const outDir = new URL(`${folder}/`, outRoot)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  const input = sharp(join(srcDir, file), { limitInputPixels: false }).rotate()
  const meta = await input.metadata()
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width ?? w)
    await input
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: w >= 2400 ? 72 : 78, effort: 5 })
      .toFile(fileURLToPath(new URL(`${name}-${w}.webp`, outDir)))
  }
  console.log(`ok ${folder}/${name} (${meta.width}x${meta.height})`)
}
