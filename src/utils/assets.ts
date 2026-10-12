/**
 * Utility to resolve relative public asset paths cleanly across local dev,
 * subpath deployments (like GitHub Pages), and production bundles.
 */
export function getAssetUrl(path: string): string {
  if (!path) return path;

  // Preserve external, data, or blob URLs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If base ends with slash (e.g. '/' or './' or '/repo/'), append directly
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }

  return `${base}/${cleanPath}`;
}
