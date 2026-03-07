export const dynamic = "force-dynamic";

import { AdminShell } from "../../_components/admin-shell";
import { SiteSeoForm } from "../_components/site-seo-form";
import { getSiteSeoSettings } from "@/lib/seo/queries";

export default async function SeoSettingsPage() {
  const settings = await getSiteSeoSettings();

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">SEO Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure site-wide SEO defaults, verification, robots, and structured data.
          </p>
        </div>
        <SiteSeoForm settings={settings} />
      </div>
    </AdminShell>
  );
}
