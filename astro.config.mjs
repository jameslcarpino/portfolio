import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.jameslcarpino.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  adapter: vercel(),
});