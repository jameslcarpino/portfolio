import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.jameslcarpino.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
});
