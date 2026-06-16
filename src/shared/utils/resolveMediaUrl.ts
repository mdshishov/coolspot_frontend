export function resolveMediaUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${import.meta.env.VITE_MEDIA_URL}${url}`;
}
