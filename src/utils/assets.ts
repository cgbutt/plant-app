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

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Prevent path doubling if path already contains the base segment
  const trimmedBase = cleanBase.replace(/^\/|\/$/g, '');
  if (trimmedBase && cleanPath.startsWith(trimmedBase + '/')) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
}
