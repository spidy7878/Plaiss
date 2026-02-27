// ─── Shared Types ─────────────────────────────────────────────────────────────
// These types are safe to import from both server and client components.

export type Product = {
  id: number
  name: string
  price: number
  colors: { hex: string; name: string }[]
  image: string
  isNew: boolean
  category: string
  description?: string
}

export type Category = {
  label: string
  slug: string
}

// ─── Utility ──────────────────────────────────────────────────────────────────
export function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Convert a product name to a URL-safe slug, e.g. "SPIDY SOFA" → "spidy-sofa" */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
