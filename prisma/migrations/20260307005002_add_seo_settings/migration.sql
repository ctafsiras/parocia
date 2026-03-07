-- CreateTable
CREATE TABLE "static_page_seo" (
    "pageKey" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalPath" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "includeInSitemap" BOOLEAN NOT NULL DEFAULT true,
    "schemaMarkup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "static_page_seo_pkey" PRIMARY KEY ("pageKey")
);

-- CreateTable
CREATE TABLE "site_seo_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteName" TEXT NOT NULL,
    "siteUrl" TEXT NOT NULL,
    "defaultTitle" TEXT,
    "titleTemplate" TEXT,
    "defaultDescription" TEXT,
    "defaultOgImage" TEXT,
    "defaultRobotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "defaultRobotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "robotsDisallowPaths" TEXT,
    "googleSiteVerification" TEXT,
    "bingSiteVerification" TEXT,
    "organizationName" TEXT,
    "organizationLogo" TEXT,
    "organizationSchema" TEXT,
    "websiteSchema" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_seo_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "site_seo_settings_siteUrl_key" ON "site_seo_settings"("siteUrl");
