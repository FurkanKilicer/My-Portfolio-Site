export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeSiteUrl(explicit);

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return normalizeSiteUrl(vercel);

  return "http://localhost:3000";
}

export function normalizeSiteUrl(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}
