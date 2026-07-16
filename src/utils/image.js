// Deterministic placeholder image helper.
// Swap this out for real uploaded image URLs from the admin dashboard later.
export function img(seed, width = 800, height = 600) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
