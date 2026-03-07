"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getStaticPageByKey, STATIC_PAGES } from "@/lib/seo/static-pages";

type FieldErrors = Record<string, string[]>;

export type SiteSeoSettingsFormState = {
  errors?: FieldErrors;
  message?: string;
};

export type StaticPageSeoFormState = {
  errors?: FieldErrors;
  message?: string;
};

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function isValidImageValue(value: string | null) {
  if (!value) {
    return true;
  }

  return /^https?:\/\//i.test(value) || value.startsWith("/");
}

function validateJsonField(
  errors: FieldErrors,
  key: string,
  label: string,
  value: string | null
) {
  if (!value) {
    return;
  }

  try {
    JSON.parse(value);
  } catch {
    errors[key] = [`${label} must be valid JSON`];
  }
}

function validateSiteUrl(siteUrl: string, errors: FieldErrors) {
  if (!siteUrl) {
    errors.siteUrl = ["Site URL is required"];
    return "";
  }

  try {
    const parsed = new URL(siteUrl);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      errors.siteUrl = ["Site URL must start with http:// or https://"];
      return "";
    }

    if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
      errors.siteUrl = ["Site URL must be a root domain without path, query, or hash"];
      return "";
    }

    return parsed.toString().replace(/\/$/, "");
  } catch {
    errors.siteUrl = ["Site URL must be a valid absolute URL"];
    return "";
  }
}

function validateCanonicalPath(value: string | null, errors: FieldErrors) {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value) || !value.startsWith("/")) {
    errors.canonicalPath = ["Canonical path must start with / and must not be a full URL"];
    return null;
  }

  return value;
}

function normalizeDisallowPaths(value: string | null, errors: FieldErrors) {
  if (!value) {
    return null;
  }

  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const invalidLine = lines.find((line) => !line.startsWith("/"));
  if (invalidLine) {
    errors.robotsDisallowPaths = ["Every disallow path must start with /"];
    return null;
  }

  return lines.join("\n");
}

function revalidateSeoPaths(pathname?: string) {
  revalidatePath("/admin/seo");
  revalidatePath("/admin/seo/settings");
  revalidatePath("/admin/seo/pages");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");

  for (const page of STATIC_PAGES) {
    revalidatePath(page.path);
  }

  if (pathname) {
    revalidatePath(pathname);
  }
}

export async function updateSiteSeoSettings(
  _prevState: SiteSeoSettingsFormState,
  formData: FormData
): Promise<SiteSeoSettingsFormState> {
  const errors: FieldErrors = {};
  const siteName = getRequiredString(formData, "siteName");
  const siteUrl = validateSiteUrl(getRequiredString(formData, "siteUrl"), errors);
  const defaultTitle = getOptionalString(formData, "defaultTitle");
  const titleTemplate = getOptionalString(formData, "titleTemplate");
  const defaultDescription = getOptionalString(formData, "defaultDescription");
  const defaultOgImage = getOptionalString(formData, "defaultOgImage");
  const robotsDisallowPaths = normalizeDisallowPaths(
    getOptionalString(formData, "robotsDisallowPaths"),
    errors
  );
  const organizationLogo = getOptionalString(formData, "organizationLogo");
  const organizationSchema = getOptionalString(formData, "organizationSchema");
  const websiteSchema = getOptionalString(formData, "websiteSchema");

  if (!siteName) {
    errors.siteName = ["Site name is required"];
  }

  if (titleTemplate && !titleTemplate.includes("%s")) {
    errors.titleTemplate = ["Title template must include %s"];
  }

  if (!isValidImageValue(defaultOgImage)) {
    errors.defaultOgImage = ["Default OG image must be an absolute URL or start with /"];
  }

  if (!isValidImageValue(organizationLogo)) {
    errors.organizationLogo = ["Organization logo must be an absolute URL or start with /"];
  }

  validateJsonField(errors, "organizationSchema", "Organization schema", organizationSchema);
  validateJsonField(errors, "websiteSchema", "Website schema", websiteSchema);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.siteSeoSettings.upsert({
    where: { id: "default" },
    update: {
      siteName,
      siteUrl,
      defaultTitle,
      titleTemplate,
      defaultDescription,
      defaultOgImage,
      defaultRobotsIndex: getBoolean(formData, "defaultRobotsIndex"),
      defaultRobotsFollow: getBoolean(formData, "defaultRobotsFollow"),
      robotsDisallowPaths,
      googleSiteVerification: getOptionalString(formData, "googleSiteVerification"),
      bingSiteVerification: getOptionalString(formData, "bingSiteVerification"),
      organizationName: getOptionalString(formData, "organizationName"),
      organizationLogo,
      organizationSchema,
      websiteSchema,
    },
    create: {
      id: "default",
      siteName,
      siteUrl,
      defaultTitle,
      titleTemplate,
      defaultDescription,
      defaultOgImage,
      defaultRobotsIndex: getBoolean(formData, "defaultRobotsIndex"),
      defaultRobotsFollow: getBoolean(formData, "defaultRobotsFollow"),
      robotsDisallowPaths,
      googleSiteVerification: getOptionalString(formData, "googleSiteVerification"),
      bingSiteVerification: getOptionalString(formData, "bingSiteVerification"),
      organizationName: getOptionalString(formData, "organizationName"),
      organizationLogo,
      organizationSchema,
      websiteSchema,
    },
  });

  revalidateSeoPaths();
  redirect("/admin/seo/settings");
}

export async function upsertStaticPageSeo(
  pageKey: string,
  _prevState: StaticPageSeoFormState,
  formData: FormData
): Promise<StaticPageSeoFormState> {
  const page = getStaticPageByKey(pageKey);
  if (!page) {
    return { message: "Static page not found" };
  }

  const errors: FieldErrors = {};
  const canonicalPath = validateCanonicalPath(
    getOptionalString(formData, "canonicalPath"),
    errors
  );
  const ogImage = getOptionalString(formData, "ogImage");
  const schemaMarkup = getOptionalString(formData, "schemaMarkup");

  if (!isValidImageValue(ogImage)) {
    errors.ogImage = ["OG image must be an absolute URL or start with /"];
  }

  validateJsonField(errors, "schemaMarkup", "Schema markup", schemaMarkup);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.staticPageSeo.upsert({
    where: { pageKey },
    update: {
      metaTitle: getOptionalString(formData, "metaTitle"),
      metaDescription: getOptionalString(formData, "metaDescription"),
      canonicalPath,
      ogTitle: getOptionalString(formData, "ogTitle"),
      ogDescription: getOptionalString(formData, "ogDescription"),
      ogImage,
      robotsIndex: getBoolean(formData, "robotsIndex"),
      robotsFollow: getBoolean(formData, "robotsFollow"),
      includeInSitemap: getBoolean(formData, "includeInSitemap"),
      schemaMarkup,
    },
    create: {
      pageKey,
      metaTitle: getOptionalString(formData, "metaTitle"),
      metaDescription: getOptionalString(formData, "metaDescription"),
      canonicalPath,
      ogTitle: getOptionalString(formData, "ogTitle"),
      ogDescription: getOptionalString(formData, "ogDescription"),
      ogImage,
      robotsIndex: getBoolean(formData, "robotsIndex"),
      robotsFollow: getBoolean(formData, "robotsFollow"),
      includeInSitemap: getBoolean(formData, "includeInSitemap"),
      schemaMarkup,
    },
  });

  revalidateSeoPaths(page.path);
  redirect("/admin/seo/pages");
}
