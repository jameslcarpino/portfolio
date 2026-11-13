// Turn a photo into a Sierra-style 320x200 background.
//   node scripts/scene.mjs scene-src/home.jpg home            # colour photo -> 256 colours, no dither
//   node scripts/scene.mjs scene-src/home.jpg home --duotone  # b/w photo -> green-to-gold ramp, 48 levels
// Output: public/scenes/<name>.png. CSS upscales it with image-rendering: pixelated.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const [, , input, name, ...flags] = process.argv;
if (!input || !name) {
  console.error("usage: node scripts/scene.mjs <input.jpg> <name> [--duotone] [--colours N]");
  process.exit(1);
}
const duotone = flags.includes("--duotone");
const ci = flags.indexOf("--colours");
const colours = ci >= 0 ? Number(flags[ci + 1]) : duotone ? 48 : 256;

const W = 320, H = 200;
const SHADOW = [0x0a, 0x16, 0x10];   // sherwood night
const HIGH = [0xa8, 0x94, 0x5a];     // muted lantern gold; boxes need to sit on top of it

let img = sharp(input).resize(W, H, { fit: "cover", kernel: "lanczos3" });

if (duotone) {
  const { data } = await img.greyscale().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H; i++) {
    // a little contrast so the ramp uses its whole range
    let t = data[i] / 255;
    t = Math.min(1, Math.max(0, (t - 0.08) / 0.84));
    t = t * t * (3 - 2 * t);
    for (let c = 0; c < 3; c++) out[i * 3 + c] = Math.round(SHADOW[c] + (HIGH[c] - SHADOW[c]) * t);
  }
  img = sharp(out, { raw: { width: W, height: H, channels: 3 } });
}

mkdirSync("public/scenes", { recursive: true });
await img.png({ palette: true, colours, dither: 0, compressionLevel: 9 }).toFile(`public/scenes/${name}.png`);
console.log(`public/scenes/${name}.png  ${W}x${H}  ${colours} colours${duotone ? " duotone" : ""}`);
