import type { MetadataRoute } from "next";
import { getSiteSeoSettings, getStaticPageSeoMap } from "./queries";
import { STATIC_PAGES } from "./static-pages";

function joinSiteUrl(siteUrl: string, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const [settings, pageSeoMap] = await Promise.all([
    getSiteSeoSettings(),
    getStaticPageSeoMap(),
  ]);

  if (!settings.siteUrl) {
    return [];
  }

  return STATIC_PAGES.flatMap((page) => {
    const pageSeo = pageSeoMap.get(page.key) ?? null;
    if (pageSeo && !pageSeo.includeInSitemap) {
      return [];
    }

    return [
      {
        url: joinSiteUrl(settings.siteUrl, pageSeo?.canonicalPath || page.path),
        lastModified:
          pageSeo?.updatedAt || settings.updatedAt || settings.createdAt || new Date(),
      },
    ];
  });
}
