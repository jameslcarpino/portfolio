# NOTES — handoff for "pick up portfolio"

www.jameslcarpino.com · repo jameslcarpino/portfolio, branch `master` · Vercel project `portfolio`
(NOT git-connected; James deploys by hand: `vercel build --prod && vercel deploy --prebuilt --prod`).
Everything below is live as of 2026-11-12 night (commit 8677eaf, deployment dpl_7KcRVKrB1xFhGWfkB6VUTSm74D5N).

## What it is
An Astro site styled as a Sierra/DOS desktop inside a centred 4:3 black-bordered `.screen`.
- **Boot** once per session: DOS prompt types, WAITS for a key, then a Sierra title card (striped sphere
  `public/boot-logo.png` made from James's Cape Disappointment headland photo by `scripts/sierra.mjs`,
  "JAMES CARPINO" in blue gradient italic, PRESENTS). Frames don't take focus until `boot:done`.
- **Home = desktop, no scrolling.** ABOUT / PROJECTS / GALLERY / BLOG are draggable boxes sharing one
  z order (`window.__top`) with the app windows; first visit cascades them, ABOUT in front and focused;
  state in localStorage `desk:v1`; minimize drops a box into the tray. Phones keep a stacked scroll.
- **Panes:** only the blog (`how not to suck at everything.md`), gallery and LB-DOS open in-page windows.
  Etymapology, Haunted Map and Human Idiot open in a NEW TAB (they live in other Vercel projects;
  `vercel.json` rewrites must stay).
- **Status line** (bottom, green on black, anchored to the bottom edge at every size): VIEWS · hall-of-fame
  ticker (hidden until the game has been run) · SINCE: 1991. Top bar: lowercase "james carpino", email /
  github / linkedin.
- **LB-DOS** (`/play`, icon bottom-right sits UNDER boxes like a real desktop icon): `C:\>` shell, `dir`,
  `open readme.txt` (lowercase text ending in a copyable `run lord_boogers_house_of_horrors.exe`), `ls -a`
  reveals `.secrets` (`open` shows the command, `run` glitches the whole screen into a pixel skull → green
  "fuck" link reloads). Game: manor-house text adventure, `src/game/world.js` + `engine.js`, lowercase clues.
- **Gallery:** drop `YYYY-MM-DD-slug.jpg` into `src/gallery/` (date = "added"). Six photos now. Film scans
  live at ~/Desktop/Ruebenson_7116-7194 (TIF → JPEG q95 via `sips`).
- **About:** `src/about.md`, one typed line = one notebook line; last line right-aligned.
- **Blog:** "coming soon." (no posts). Posts go in `src/content/blog/*.md`.

## Open threads (in James's order of mention)
1. **Hidden gallery** — James: "I'm going to want to make a hidden gallery, but not now." Not designed.
   Natural fit: an LB-DOS easter egg opening a second photo folder. Wait for his direction.
2. **Upstash store** for VIEWS + hall of fame — needs his yes to `vercel integration add upstash/upstash-kv`
   then `vercel env pull --yes`. Until then VIEWS shows "—" and the board is empty.
3. **Torrance.ttf** (Toronto body font) still missing at `public/fonts/`; falls back to Roboto Slab.
4. Easter-egg ideas for LB-DOS were floated, none picked.

## Gotchas
- Dev server: `npx astro dev` on :4321. Browser checks: the Chrome extension can't resize the window or
  send real keys; use a same-origin harness page in `public/_x.html` with an iframe (`/?full` opts out of
  framed mode), measure with JS, delete the harness before committing.
- Production deploys from Claude get denied by the permission classifier; James runs the deploy line.
- GitHub warns every push bypasses a PR rule and lists old dependabot vulns (legacy React lockfile): ignore.
