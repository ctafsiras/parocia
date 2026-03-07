import { notFound } from "next/navigation";
import { AdminShell } from "../../../../_components/admin-shell";
import { StaticPageSeoForm } from "../../../_components/static-page-seo-form";
import { getSiteSeoSettings, getStaticPageSeo } from "@/lib/seo/queries";
import { getStaticPageByKey } from "@/lib/seo/static-pages";

export default async function EditStaticPageSeoPage({
  params,
}: {
  params: Promise<{ pageKey: string }>;
}) {
  const { pageKey } = await params;
  const page = getStaticPageByKey(pageKey);

  if (!page) {
    notFound();
  }

  const [pageSeo, siteSettings] = await Promise.all([
    getStaticPageSeo(pageKey),
    getSiteSeoSettings(),
  ]);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit Static Page SEO</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Update metadata for {page.label}.
          </p>
        </div>
        <StaticPageSeoForm
          page={page}
          pageSeo={pageSeo}
          defaultRobotsIndex={siteSettings.defaultRobotsIndex}
          defaultRobotsFollow={siteSettings.defaultRobotsFollow}
        />
      </div>
    </AdminShell>
  );
}
