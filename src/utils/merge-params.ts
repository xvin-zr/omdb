export function mergeSearchParams(curr: string, next: string) {
  const currSearchParams = new URLSearchParams(curr);
  const nextSearchParams = new URLSearchParams(next);

  for (const [key, value] of nextSearchParams.entries()) {
    currSearchParams.set(key, value);
  }

  return currSearchParams.toString();
}
