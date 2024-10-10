/**
 * Parses a URL path based on a given pattern and extracts the parameters.
 *
 * @param pattern - The pattern used to match the URL path.
 * @param url - The URL path to be parsed.
 * @returns An object containing the extracted parameters from the URL path.
 */
export function parsePath(pattern: string, url: string) {
  const patternParts = pattern.split('/').filter(Boolean);
  const urlParts = url.split('/').filter(Boolean);

  const params: Record<string, string | undefined> = {};

  patternParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const key = part.slice(1);
      const value = urlParts[index];
      params[key] = value;
    }
  });

  return params;
}
