import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One markdown file in src/content/blog = one post.
// The filename (minus .md) is the URL: hello-world.md -> /blog/hello-world
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
