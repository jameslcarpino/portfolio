// The photo gallery is a folder: src/gallery/*.jpg (png, webp too).
// Prefix the filename with the date you added it; that sets the order and shows
// as "added Nov 12, 2026". The rest of the name is for you, it never shows.
//   2026-11-12-amtrak-lounge-car.jpg
// Newest first. No frontmatter, no list to maintain.
import type { ImageMetadata } from "astro";

export type Photo = { slug: string; title: string; date: Date | null; image: ImageMetadata };

const files = import.meta.glob<{ default: ImageMetadata }>("./gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}", { eager: true });

export const photos: Photo[] = Object.entries(files)
  .map(([path, mod]) => {
    const file = path.split("/").pop()!.replace(/\.[^.]+$/, "");
    const m = file.match(/^(\d{4}-\d{2}-\d{2})-?(.*)$/);
    const date = m ? new Date(m[1] + "T00:00:00Z") : null;
    const rest = (m ? m[2] : file) || file;
    return { slug: file, title: rest.replace(/[-_]+/g, " ").trim(), date, image: mod.default };
  })
  .sort((a, b) => b.slug.localeCompare(a.slug));
