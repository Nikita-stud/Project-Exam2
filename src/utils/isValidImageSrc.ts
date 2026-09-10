export function isValidImageSrc(src?: string) {
  if (!src) {
    return false;
  }

  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
}
