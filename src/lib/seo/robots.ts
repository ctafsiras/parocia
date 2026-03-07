import type { MetadataRoute } from "next";
import type { SiteSeoSettingsRecord } from "./queries";

function parseDisallowPaths(value: string | null) {
  if (!value) {
    return [] as string[];
  }

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.startsWith("/") ? line : `/${line}`));
}

export function buildRobotsConfig(
  settings: SiteSeoSettingsRecord
): MetadataRoute.Robots {
  const disallowPaths = parseDisallowPaths(settings.robotsDisallowPaths);
  const shouldBlockAll = !settings.defaultRobotsIndex;

  return {
    rules: {
      userAgent: "*",
      allow: shouldBlockAll ? undefined : "/",
      disallow: shouldBlockAll ? ["/", ...disallowPaths] : disallowPaths,
    },
    sitemap: settings.siteUrl ? `${settings.siteUrl}/sitemap.xml` : undefined,
    host: settings.siteUrl || undefined,
  };
}
