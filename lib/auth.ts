// Redirection sûre après login
export function getSafeRedirectFrom(from: string | null): string | null {
  if (!from || typeof from !== "string") return null;
  const path = from.startsWith("/") ? from : `/${from}`;
  if (path.includes("//") || path.startsWith("/\\")) return null;
  return path;
}
