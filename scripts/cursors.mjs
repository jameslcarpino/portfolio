// Pixel art: ASCII -> scaled PNGs. X black, o white, b grey, c cream, . clear.
// Cursors go to public/cursors at 2x, icons to public/icons at 3x.
// usage: node scripts/cursors.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const COLOURS = { X: [0, 0, 0, 255], o: [255, 255, 255, 255], b: [124, 135, 141, 255], c: [243, 228, 208, 255], g: [75, 224, 75, 255], k: [10, 10, 10, 255] };
const ICONS = {};
const ART = {
  arrow: `
X..........
XX.........
XoX........
XooX.......
XoooX......
XooooX.....
XoooooX....
XooooooX...
XoooooooX..
XooooooooX.
XoooooXXXXX
XooXooX....
XoX.XooX...
XX..XooX...
X....XooX..
.....XXX...`,
  hand: `
.....XX.......
....XooX......
....XooX......
....XooX......
....XooXXX....
....XooXooXX..
.XX.XooXooXoX.
XooXXooooooooX
XoooXooooooooX
.XooooooooooX.
..XoooooooooX.
..XoooooooooX.
...XooooooooX.
...XoooooooX..
....XoooooX...
....XXXXXXX...`,
};

mkdirSync("public/cursors", { recursive: true });
mkdirSync("public/icons", { recursive: true });
async function render(name, art, scale, dir) {
  const rows = art.trim().split("\n");
  const w = rows[0].length, h = rows.length;
  const buf = Buffer.alloc(w * scale * h * scale * 4);
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    const px = COLOURS[ch] || [0, 0, 0, 0];
    for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) {
      const i = (((y * scale + dy) * w * scale) + (x * scale + dx)) * 4;
      buf.set(px, i);
    }
  }));
  await sharp(buf, { raw: { width: w * scale, height: h * scale, channels: 4 } }).png().toFile(`${dir}/${name}.png`);
  console.log(`${dir}/${name}.png  ${w * scale}x${h * scale}`);
}
for (const [name, art] of Object.entries(ART)) await render(name, art, 2, "public/cursors");
for (const [name, art] of Object.entries(ICONS)) await render(name, art, 3, "public/icons");
