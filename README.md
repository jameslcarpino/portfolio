# jameslcarpino.com

A plain static site built with [Astro](https://astro.build). Markdown in, HTML out, no client JavaScript.

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
