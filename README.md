# jameslcarpino.com

A plain static site built with [Astro](https://astro.build). Markdown in, HTML out, no client JavaScript.

## Photos

The GALLERY is a folder: `src/gallery/`. Drop in a `.jpg`, `.png` or `.webp` and push. Photos show without titles. Prefix the filename with the date you added it; that sets the order (newest first) and shows on the photo as "added Nov 12, 2026". The rest of the name is for you and never shows:

    src/gallery/2026-11-12-amtrak-lounge-car.jpg

Put in the full-resolution file. The build makes the sizes it needs (up to 2400px wide, quality 92) and the photo page links to the original.

## The game

Click the LB-DOS icon in the bottom right (logo drawn by `scripts/logo.mjs`) to get a `C:\>` prompt (`/play`). `dir` lists `lord_boogers_house_of_horrors.exe`; `run` it to start the text adventure: you write for a dying weekly and need photographic proof of the supernatural from a manor house by Friday. Nothing in the room text is capitalized as a clue on purpose. The rooms, items, people and puzzles are all in `src/game/world.js`; the parser is `src/game/engine.js`. To add a room, add it to `rooms` with its exits and it is in the game. SAVE and RESTORE use the browser's localStorage. A win asks for three initials and posts the time to `/api/scores` (same Redis as the view counter); the status line ticker scrolls the fastest twenty.

There is also a hidden `.secrets` in the shell (`ls -a`). `open` shows it, `run` runs it. It lives in `src/pages/play.astro`; what it does to the screen is `public/glitch.js`.

## The view counter

The status line's VIEWS number comes from `/api/views`, a tiny server route that INCRs one key in Redis. It reads `KV_REST_API_URL` and `KV_REST_API_TOKEN`, which the Upstash Redis integration on Vercel sets. Without them (local dev) it shows a dash.

## The about box

The ABOUT box on the home screen is `src/about.md`. Plain text, no frontmatter; line breaks show exactly where you type them, and `[text](https://url)` makes a link. Edit it and push.

## Writing a post

1. Add a file to `src/content/blog/`, e.g. `src/content/blog/some-title.md`. The filename is the URL: `/blog/some-title`.
2. Start it with frontmatter:

   ```md
   ---
   title: Some Title
   date: 2026-11-05
   summary: One line, optional. Shows on the index.
   draft: false
   ---

   Body in markdown.
   ```

3. Commit and push. Set `draft: true` to keep a post out of the build.

## The look

The site is styled as a Sierra SCI1 adventure game (Longbow, King's Quest V, Space Quest IV, Dagger of Amon Ra) running off a floppy, full screen. Everything is in `src/styles/zine.css` and `src/layouts/Base.astro`.

- **Scenes.** Each page has a painted 320x200 background in `public/scenes/`. Make one from a photo with
  `node scripts/scene.mjs scene-src/<photo>.jpg <name>` (add `--duotone` for a black-and-white photo; it maps the
  grays onto a green-to-gold ramp). Pages pick a scene with the `scene` prop on `Base`. Originals live in `scene-src/`.
- **Fonts.** Chicago (ChicagoFLF, public domain) loads from Font Library. Body text wants Toronto: drop Kreative Korp's
  `Torrance.ttf` into `public/fonts/` and it is picked up; until then it falls back to Roboto Slab.
- **Boot.** A DOS prompt and logo card play once per browser session; any key skips. Clear `sessionStorage` to see it again.
- **404** is the Sierra death dialog.

## Running locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

## Deploying

The Vercel project `portfolio` is not git-connected. Deploy by hand:

```sh
vercel build --prod && vercel deploy --prebuilt --prod
```

`vercel.json` also rewrites `/maps/etymapology` and `/human-idiot` to their own Vercel projects. Keep those.

## History

The original 2020 React portfolio (drag-and-drop home page, Lambda School projects, Resumap) lives on the `legacy-2020-site` branch and tag, untouched.
