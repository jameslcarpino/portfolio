// LBHH logo in the manner of the MS-DOS logo: grey letters on top, red and
// yellow letters below, a magenta/blue checkered ribbon woven through.
// Drawn on a 32x32 grid, rendered at 2x to public/icons/lbhh.png.
// usage: node scripts/logo.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const W = 32, H = 32, SCALE = 2;
const C = {
  g: [192, 192, 192], d: [128, 128, 128], w: [255, 255, 255],
  r: [255, 0, 0], R: [128, 0, 0], y: [255, 255, 0], Y: [128, 128, 0],
  m: [255, 0, 255], u: [0, 0, 255], X: [0, 0, 0],
};
const grid = Array.from({ length: H }, () => Array(W).fill(null));
const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < W && y < H) grid[y][x] = c; };
const rect = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(x, y, c); };
// a letter drawn with a light face and a darker right/bottom edge
function shaded(parts, face, edge) {
  for (const [x0, y0, x1, y1] of parts) rect(x0, y0, x1, y1, face);
  for (const [x0, y0, x1, y1] of parts) { for (let y = y0; y <= y1; y++) put(x1, y, edge); for (let x = x0; x <= x1; x++) put(x, y1, edge); }
}
const ribbon = (x, y) => put(x, y, (x + y) % 2 ? "m" : "u");

// L and B, grey
shaded([[2, 1, 5, 12], [2, 9, 11, 12]], "g", "d");
shaded([[14, 1, 17, 12], [14, 1, 24, 3], [14, 6, 24, 7], [14, 10, 24, 12], [22, 1, 25, 7], [23, 6, 26, 12]], "g", "d");
// H, red
shaded([[2, 16, 5, 30], [10, 16, 13, 30], [2, 22, 13, 24]], "r", "R");
// ribbon: a diagonal band, five pixels thick, rising left to right
for (let x = 0; x < W; x++) {
  const yc = Math.round(30 - x * 0.5);       // centre line from (0,30) to (31,14.5)
  for (let t = -2; t <= 2; t++) ribbon(x, yc + t);
}
// H, yellow, drawn over the ribbon so the band passes behind it
shaded([[18, 16, 21, 30], [26, 16, 29, 30], [18, 22, 29, 24]], "y", "Y");
// ribbon reappears through the yellow H's two openings
for (let x = 22; x <= 25; x++) for (let y = 16; y <= 30; y++) if (y !== 22 && y !== 23 && y !== 24) { const yc = Math.round(30 - x * 0.5); if (Math.abs(y - yc) <= 2) ribbon(x, y); }

// black outline around everything
const filled = grid.map((row) => row.map(Boolean));
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (filled[y][x]) continue;
  const near = [[1,0],[-1,0],[0,1],[0,-1]].some(([dx, dy]) => filled[y + dy]?.[x + dx]);
  if (near) grid[y][x] = "X";
}

const buf = Buffer.alloc(W * SCALE * H * SCALE * 4);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const c = grid[y][x]; const px = c ? [...C[c], 255] : [0, 0, 0, 0];
  for (let dy = 0; dy < SCALE; dy++) for (let dx = 0; dx < SCALE; dx++) buf.set(px, (((y * SCALE + dy) * W * SCALE) + x * SCALE + dx) * 4);
}
mkdirSync("public/icons", { recursive: true });
await sharp(buf, { raw: { width: W * SCALE, height: H * SCALE, channels: 4 } }).png().toFile("public/icons/lbhh.png");
console.log(`public/icons/lbhh.png  ${W * SCALE}x${H * SCALE}`);
