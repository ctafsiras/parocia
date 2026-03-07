export const dynamic = "force-dynamic";

import Link from "next/link";
import { Pencil, FileText } from "lucide-react";
import { AdminShell } from "../../_components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getSiteSeoSettings,
  getStaticPageSeoMap,
  type StaticPageSeoRecord,
} from "@/lib/seo/queries";
import { STATIC_PAGES } from "@/lib/seo/static-pages";

function hasSeoConfigured(pageSeo: StaticPageSeoRecord | null) {
  return Boolean(
    pageSeo &&
      (pageSeo.metaTitle ||
        pageSeo.metaDescription ||
        pageSeo.canonicalPath ||
        pageSeo.ogTitle ||
        pageSeo.ogDescription ||
        pageSeo.ogImage ||
        pageSeo.schemaMarkup)
  );
}

export default async function StaticPageSeoListPage() {
  const [siteSettings, pageSeoMap] = await Promise.all([
    getSiteSeoSettings(),
    getStaticPageSeoMap(),
  ]);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Static Page SEO</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage metadata for code-defined static pages.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/seo/settings">Global Settings</Link>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>SEO</TableHead>
                  <TableHead>Index</TableHead>
                  <TableHead>Sitemap</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STATIC_PAGES.map((page) => {
                  const pageSeo = pageSeoMap.get(page.key) ?? null;
                  const isConfigured = hasSeoConfigured(pageSeo);
                  const canIndex = pageSeo?.robotsIndex ?? siteSettings.defaultRobotsIndex;
                  const inSitemap = pageSeo?.includeInSitemap ?? true;

                  return (
                    <TableRow key={page.key}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-muted p-2">
                            <FileText className="size-3.5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{page.label}</div>
                            <div className="text-xs text-muted-foreground">{page.key}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{page.path}</code>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {isConfigured ? "Configured" : "Not set"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {canIndex ? "Enabled" : "Disabled"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {inSitemap ? "Included" : "Excluded"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href={`/admin/seo/pages/${page.key}/edit`}>
                            <Pencil className="size-3.5" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
