import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type SiteSeoSettingsRecord = {
  id: string;
  siteName: string;
  siteUrl: string;
  defaultTitle: string | null;
  titleTemplate: string | null;
  defaultDescription: string | null;
  defaultOgImage: string | null;
  defaultRobotsIndex: boolean;
  defaultRobotsFollow: boolean;
  robotsDisallowPaths: string | null;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  organizationName: string | null;
  organizationLogo: string | null;
  organizationSchema: string | null;
  websiteSchema: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type StaticPageSeoRecord = {
  pageKey: string;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalPath: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  includeInSitemap: boolean;
  schemaMarkup: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export const DEFAULT_SITE_SEO_SETTINGS: SiteSeoSettingsRecord = {
  id: "default",
  siteName: "Parocia",
  siteUrl: "",
  defaultTitle: null,
  titleTemplate: "%s | Parocia",
  defaultDescription:
    "Discover premium skincare, haircare, and beauty products crafted for timeless elegance.",
  defaultOgImage: null,
  defaultRobotsIndex: true,
  defaultRobotsFollow: true,
  robotsDisallowPaths: null,
  googleSiteVerification: null,
  bingSiteVerification: null,
  organizationName: null,
  organizationLogo: null,
  organizationSchema: null,
  websiteSchema: null,
  createdAt: null,
  updatedAt: null,
};

function toSiteSeoSettingsRecord(
  settings: SiteSeoSettingsRecord | null
): SiteSeoSettingsRecord {
  if (!settings) {
    return DEFAULT_SITE_SEO_SETTINGS;
  }

  return {
    id: settings.id,
    siteName: settings.siteName,
    siteUrl: settings.siteUrl,
    defaultTitle: settings.defaultTitle,
    titleTemplate: settings.titleTemplate,
    defaultDescription: settings.defaultDescription,
    defaultOgImage: settings.defaultOgImage,
    defaultRobotsIndex: settings.defaultRobotsIndex,
    defaultRobotsFollow: settings.defaultRobotsFollow,
    robotsDisallowPaths: settings.robotsDisallowPaths,
    googleSiteVerification: settings.googleSiteVerification,
    bingSiteVerification: settings.bingSiteVerification,
    organizationName: settings.organizationName,
    organizationLogo: settings.organizationLogo,
    organizationSchema: settings.organizationSchema,
    websiteSchema: settings.websiteSchema,
    createdAt: settings.createdAt,
    updatedAt: settings.updatedAt,
  };
}

function toStaticPageSeoRecord(
  record: StaticPageSeoRecord | null
): StaticPageSeoRecord | null {
  if (!record) {
    return null;
  }

  return {
    pageKey: record.pageKey,
    metaTitle: record.metaTitle,
    metaDescription: record.metaDescription,
    canonicalPath: record.canonicalPath,
    ogTitle: record.ogTitle,
    ogDescription: record.ogDescription,
    ogImage: record.ogImage,
    robotsIndex: record.robotsIndex,
    robotsFollow: record.robotsFollow,
    includeInSitemap: record.includeInSitemap,
    schemaMarkup: record.schemaMarkup,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export const getSiteSeoSettings = cache(async () => {
  const settings = await prisma.siteSeoSettings.findUnique({
    where: { id: DEFAULT_SITE_SEO_SETTINGS.id },
  });

  return toSiteSeoSettingsRecord(settings as SiteSeoSettingsRecord | null);
});

export const getSiteUrl = cache(async () => {
  const settings = await getSiteSeoSettings();
  return settings.siteUrl;
});

export const getStaticPageSeo = cache(async (pageKey: string) => {
  const record = await prisma.staticPageSeo.findUnique({ where: { pageKey } });
  return toStaticPageSeoRecord(record as StaticPageSeoRecord | null);
});

export const getStaticPageSeoMap = cache(
  async (): Promise<Map<string, StaticPageSeoRecord>> => {
  const records = await prisma.staticPageSeo.findMany();
    return new Map(
      (records as StaticPageSeoRecord[]).map((record) => [
        record.pageKey,
        record,
      ])
    );
  }
);
