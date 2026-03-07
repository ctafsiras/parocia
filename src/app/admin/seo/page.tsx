export const dynamic = "force-dynamic";

import Link from "next/link";
import { Settings, FileText, Search } from "lucide-react";
import { AdminShell } from "../_components/admin-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getSiteSeoSettings,
  getStaticPageSeoMap,
  type StaticPageSeoRecord,
} from "@/lib/seo/queries";
import { STATIC_PAGES } from "@/lib/seo/static-pages";

function hasPageSeoConfigured(pageSeo: StaticPageSeoRecord | null) {
  if (!pageSeo) {
    return false;
  }

  return Boolean(
    pageSeo.metaTitle ||
      pageSeo.metaDescription ||
      pageSeo.canonicalPath ||
      pageSeo.ogTitle ||
      pageSeo.ogDescription ||
      pageSeo.ogImage ||
      pageSeo.schemaMarkup
  );
}

export default async function SeoDashboardPage() {
  const [siteSettings, pageSeoMap] = await Promise.all([
    getSiteSeoSettings(),
    getStaticPageSeoMap(),
  ]);

  const configuredPages = STATIC_PAGES.filter((page) =>
    hasPageSeoConfigured(pageSeoMap.get(page.key) ?? null)
  ).length;
  const isSiteUrlConfigured = Boolean(siteSettings.siteUrl);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">SEO</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage global SEO settings and metadata for static pages.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/seo/settings">
              <Settings className="size-4" />
              Site Settings
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatusCard
            title="Site URL"
            description={isSiteUrlConfigured ? siteSettings.siteUrl : "Not configured yet"}
            status={isSiteUrlConfigured ? "Ready" : "Action needed"}
          />
          <StatusCard
            title="Static Pages"
            description={`${configuredPages} of ${STATIC_PAGES.length} configured`}
            status={configuredPages > 0 ? "In progress" : "Not started"}
          />
          <StatusCard
            title="Sitemap"
            description={
              isSiteUrlConfigured
                ? "Will generate from registered static pages"
                : "Needs site URL first"
            }
            status={isSiteUrlConfigured ? "Ready" : "Blocked"}
          />
          <StatusCard
            title="Robots"
            description={
              isSiteUrlConfigured
                ? "Will publish sitemap reference automatically"
                : "Needs site URL first"
            }
            status={isSiteUrlConfigured ? "Ready" : "Blocked"}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="size-4 text-muted-foreground" />
                <CardTitle>Global SEO Settings</CardTitle>
              </div>
              <CardDescription>
                Configure site-wide defaults for titles, descriptions, robots, verification,
                and schema.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Use admin-managed site settings as the source of truth for canonical URLs,
                sitemap, and robots.
              </div>
              <Button asChild variant="outline">
                <Link href="/admin/seo/settings">Manage</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground" />
                <CardTitle>Static Page SEO</CardTitle>
              </div>
              <CardDescription>
                Edit metadata for fixed pages created in code, starting with the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Future static pages can be added to the code registry and will appear here.
              </div>
              <Button asChild variant="outline">
                <Link href="/admin/seo/pages">Manage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="size-4 text-muted-foreground" />
              <CardTitle>Current Static Pages</CardTitle>
            </div>
            <CardDescription>
              Registered static pages available for admin-managed SEO.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {STATIC_PAGES.map((page) => {
              const pageSeo = pageSeoMap.get(page.key) ?? null;
              const configured = hasPageSeoConfigured(pageSeo);

              return (
                <div
                  key={page.key}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <div className="font-medium">{page.label}</div>
                    <div className="text-sm text-muted-foreground">{page.path}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {configured ? "Configured" : "Not set"}
                    </span>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/seo/pages/${page.key}/edit`}>Edit SEO</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

function StatusCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-base">{status}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  );
}
