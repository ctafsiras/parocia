import type { Metadata } from "next";
import type { SiteSeoSettingsRecord, StaticPageSeoRecord } from "./queries";
import type { StaticPage } from "./static-pages";

const FALLBACK_DESCRIPTION =
  "Discover premium skincare, haircare, and beauty products crafted for timeless elegance.";

function getMetadataBase(siteUrl: string) {
  if (!siteUrl) {
    return undefined;
  }

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

function joinSiteUrl(siteUrl: string, path: string) {
  if (!siteUrl) {
    return undefined;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

function resolveAssetUrl(siteUrl: string, value: string | null | undefined) {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (!siteUrl || !value.startsWith("/")) {
    return undefined;
  }

  return `${siteUrl}${value}`;
}

function buildRobots(index: boolean, follow: boolean): Metadata["robots"] {
  return {
    index,
    follow,
    googleBot: {
      index,
      follow,
    },
  };
}

export function buildRootMetadata(settings: SiteSeoSettingsRecord): Metadata {
  const defaultTitle = settings.defaultTitle?.trim() || settings.siteName || "Parocia";
  const defaultDescription = settings.defaultDescription?.trim() || FALLBACK_DESCRIPTION;
  const titleTemplate =
    settings.titleTemplate?.trim() || `%s | ${settings.siteName || "Parocia"}`;
  const metadataBase = getMetadataBase(settings.siteUrl);
  const defaultOgImage = resolveAssetUrl(settings.siteUrl, settings.defaultOgImage);

  return {
    metadataBase,
    applicationName: settings.siteName,
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: defaultDescription,
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      title: defaultTitle,
      description: defaultDescription,
      url: settings.siteUrl || undefined,
      images: defaultOgImage ? [{ url: defaultOgImage }] : undefined,
    },
    twitter: {
      card: defaultOgImage ? "summary_large_image" : "summary",
      title: defaultTitle,
      description: defaultDescription,
      images: defaultOgImage ? [defaultOgImage] : undefined,
    },
    robots: buildRobots(
      settings.defaultRobotsIndex,
      settings.defaultRobotsFollow
    ),
    verification: {
      google: settings.googleSiteVerification || undefined,
      other: settings.bingSiteVerification
        ? { "msvalidate.01": settings.bingSiteVerification }
        : undefined,
    },
  };
}

export function buildStaticPageMetadata({
  page,
  pageSeo,
  siteSettings,
}: {
  page: StaticPage;
  pageSeo: StaticPageSeoRecord | null;
  siteSettings: SiteSeoSettingsRecord;
}): Metadata {
  const description =
    pageSeo?.metaDescription?.trim() ||
    siteSettings.defaultDescription?.trim() ||
    FALLBACK_DESCRIPTION;
  const canonicalPath = pageSeo?.canonicalPath?.trim() || page.path;
  const canonicalUrl = joinSiteUrl(siteSettings.siteUrl, canonicalPath);
  const title = pageSeo?.metaTitle?.trim() || undefined;
  const ogTitle =
    pageSeo?.ogTitle?.trim() || title || siteSettings.defaultTitle || siteSettings.siteName;
  const ogDescription = pageSeo?.ogDescription?.trim() || description;
  const ogImage = resolveAssetUrl(
    siteSettings.siteUrl,
    pageSeo?.ogImage || siteSettings.defaultOgImage
  );

  return {
    title,
    description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      type: "website",
      siteName: siteSettings.siteName,
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: buildRobots(
      pageSeo?.robotsIndex ?? siteSettings.defaultRobotsIndex,
      pageSeo?.robotsFollow ?? siteSettings.defaultRobotsFollow
    ),
  };
}
