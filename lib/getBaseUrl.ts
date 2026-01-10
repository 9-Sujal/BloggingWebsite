export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser → relative OK

  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
