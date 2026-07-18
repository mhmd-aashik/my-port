import "server-only";
import { revalidatePath } from "next/cache";

// Central map of which public routes each content entity affects.
// Mutations call this so edits appear without redeploying.
const pathsByEntity: Record<string, string[]> = {
  settings: ["/", "/about", "/contact", "/blog", "/projects"],
  profile: ["/", "/about", "/contact"],
  about: ["/about"],
  experience: ["/", "/experience"],
  education: ["/education"],
  project: ["/", "/projects", "/sitemap.xml"],
  skill: ["/", "/skills"],
  story: ["/", "/story"],
  blog: ["/", "/blog", "/sitemap.xml", "/rss.xml"],
  navigation: ["/"],
};

export function revalidatePublic(entity: keyof typeof pathsByEntity, slugPath?: string) {
  for (const path of pathsByEntity[entity] ?? []) {
    revalidatePath(path);
  }
  if (slugPath) revalidatePath(slugPath);
  // Layout-level data (nav, footer) appears on every page.
  if (entity === "settings" || entity === "profile" || entity === "navigation") {
    revalidatePath("/", "layout");
  }
}
