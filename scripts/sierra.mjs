// The boot logo: the Sierra sphere, but the mountain is a photo of ours.
// Frame 000071940032 (the headland at Cape Disappointment) has the dome and cliff
// of Half Dome in profile. We trace its skyline, keep the rock's own light and
// shade as bands of blue, pour a cyan sky behind it, clip to a circle and slice
// the whole thing with the horizontal blinds. Output: public/boot-logo.png (2x).
import sharp from "sharp";
import { existsSync } from "node:fs";

const SRC = process.argv[2] || "scene-src/headland.jpg";
if (!existsSync(SRC)) { console.error("no source photo at " + SRC); process.exit(1); }

const W = 640, H = 640, CX = 320, CY = 320, R = 300;
const BAND = 22, GAP = 7;           // blinds: period and dark gap, in 2x pixels
const meta = await sharp(SRC).metadata();
const k = meta.width / 900;         // the crop was picked on a 900px preview
const crop = { left: 0, top: Math.round(60 * k), width: Math.round(660 * k), height: Math.round(340 * k) };
const MW = 600;                      // the mountain's width inside the sphere
const X_OFF = Math.round((W - MW) / 2), Y_OFF = 118; // where the crop lands in the sphere
const horizon = Math.round((372 - 60) * (MW / 660)); // water line inside the resized crop
const { data, info } = await sharp(SRC).extract(crop).resize(MW).raw().toBuffer({ resolveWithObject: true });
const CW = info.width, CH = info.height;
const px = (x, y) => { const i = (y * CW + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };

// sky is bright and bluer than it is red; rock, grass and trees are not
const isSky = ([r, g, b]) => (r + g + b) / 3 > 120 && b >= r - 6;
const skyline = new Array(CW).fill(CH);
for (let x = 0; x < CW; x++) {
  let run = 0;
  for (let y = 0; y < CH; y++) {
    if (y >= horizon) { skyline[x] = Math.min(skyline[x], y); break; }
    if (!isSky(px(x, y))) { if (++run >= 3) { skyline[x] = y - 2; break; } } else run = 0;
  }
}
// the ridge: lift the land up to the tree tops, then round it off into a dome
const lifted = skyline.map((_, x) => Math.min(...skyline.slice(Math.max(0, x - 6), x + 7)));
const smooth = (a, n) => a.map((_, x) => { let s = 0, c = 0; for (let i = x - n; i <= x + n; i++) if (i >= 0 && i < a.length) { s += a[i]; c++; } return s / c; });
const ridge = smooth(smooth(lifted, 8), 8).map(Math.round);
// the forest left of the dome stands nearly as tall as the dome itself; the
// Sierra mountain rises out of the lower left, so the left shoulder is cut down
// to a slope that climbs from the sphere's edge up to the peak
let peak = Math.round(CW * 0.3); for (let x = peak; x < CW * 0.7; x++) if (ridge[x] < ridge[peak]) peak = x; // the dome, not a tall tree at the edge
const edgeL = -X_OFF, base = horizon - 10;
const slopeAt = (x) => { const t = Math.max(0, Math.min(1, (x - edgeL) / (peak - edgeL))); return Math.round(base + (ridge[peak] - base) * Math.pow(t, 0.75)); };
const ridgeAt = (x) => {
  const r = ridge[Math.max(0, Math.min(CW - 1, x))];      // beyond the photo, carry the edge on
  return x < peak ? Math.max(r, slopeAt(x)) : r;
};

// spread the rock's own light and shade over five blues
const lums = [];
for (let y = 0; y < Math.min(CH, horizon); y++) for (let x = 0; x < CW; x++) if (y >= ridgeAt(x)) { const [r, g, b] = px(x, y); lums.push(0.3 * r + 0.59 * g + 0.11 * b); }
lums.sort((a, b) => a - b);
const q = (p) => lums[Math.floor(p * (lums.length - 1))];
const cuts = [q(0.22), q(0.48), q(0.72), q(0.9)];

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const SKY_TOP = hex("#d2f9ff"), SKY_MID = hex("#36c4f4"), SKY_BOT = hex("#0b5fc4");
const SEA_TOP = hex("#2f9fe8"), SEA_BOT = hex("#0a47ad");
const ROCK = ["#071f58", "#0a327f", "#1250ad", "#2a7fd6", "#5fb6ec"].map(hex);

const out = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const o = (y * W + x) * 4;
    const dx = x - CX, dy = y - CY;
    if (dx * dx + dy * dy > R * R) continue;            // outside the sphere: clear
    if (y % BAND < GAP) continue;                        // the blinds
    const cy = y - Y_OFF, cx = x - X_OFF;                // position inside the crop
    const land = cy >= 0 && cy < horizon && cy >= ridgeAt(cx);
    let c;
    if (cy >= horizon) {
      // below the water line the mountain floats on the sphere's own blue, as in the original
      const t = (cy - horizon) / (CY + R - Y_OFF - horizon);
      c = lerp(SEA_TOP, SEA_BOT, Math.min(1, t));
    } else if (!land) {
      const t = (y - (CY - R)) / (2 * R);
      c = t < 0.55 ? lerp(SKY_TOP, SKY_MID, t / 0.55) : lerp(SKY_MID, SKY_BOT, (t - 0.55) / 0.45);
    } else {
      let i;
      if (cy < horizon && cx >= 0 && cx < CW) {
        const [r, g, b] = px(cx, cy); const lum = 0.3 * r + 0.59 * g + 0.11 * b;
        i = lum < cuts[0] ? 0 : lum < cuts[1] ? 1 : lum < cuts[2] ? 2 : lum < cuts[3] ? 3 : 4;
      } else i = 1;                                      // beyond the photo
      c = ROCK[i];
      // the sphere's shine: brighter toward the upper left, like the original
      const shine = Math.max(0, 1 - Math.hypot(x - 200, y - 200) / 520) * 0.18;
      c = lerp(c, [255, 255, 255], shine);
    }
    out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = 255;
  }
}
await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile("public/boot-logo.png");
console.log("wrote public/boot-logo.png");
