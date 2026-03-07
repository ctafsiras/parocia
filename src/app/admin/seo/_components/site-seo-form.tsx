"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  updateSiteSeoSettings,
  type SiteSeoSettingsFormState,
} from "@/lib/actions/seo-actions";
import type { SiteSeoSettingsRecord } from "@/lib/seo/queries";

export function SiteSeoForm({ settings }: { settings: SiteSeoSettingsRecord }) {
  const [state, formAction, isPending] = useActionState<SiteSeoSettingsFormState, FormData>(
    updateSiteSeoSettings,
    {}
  );
  const siteNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    siteNameRef.current?.focus();
  }, []);

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Core Settings</CardTitle>
          <CardDescription>
            Site URL is used for canonical URLs, sitemap generation, robots, and absolute social
            image paths.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldError state={state} name="siteName">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              name="siteName"
              ref={siteNameRef}
              defaultValue={settings.siteName}
              placeholder="Parocia"
            />
          </FieldError>

          <FieldError state={state} name="siteUrl">
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input
              id="siteUrl"
              name="siteUrl"
              defaultValue={settings.siteUrl}
              placeholder="https://parocia.com"
            />
            <p className="text-xs text-muted-foreground">
              Use the root domain only. Changing this updates all canonical URLs and sitemap URLs.
            </p>
          </FieldError>

          <FieldError state={state} name="defaultTitle">
            <Label htmlFor="defaultTitle">Default Title</Label>
            <Input
              id="defaultTitle"
              name="defaultTitle"
              defaultValue={settings.defaultTitle ?? ""}
              placeholder="Parocia"
            />
          </FieldError>

          <FieldError state={state} name="titleTemplate">
            <Label htmlFor="titleTemplate">Title Template</Label>
            <Input
              id="titleTemplate"
              name="titleTemplate"
              defaultValue={settings.titleTemplate ?? ""}
              placeholder="%s | Parocia"
            />
            <p className="text-xs text-muted-foreground">Template must include %s.</p>
          </FieldError>

          <FieldError state={state} name="defaultDescription">
            <Label htmlFor="defaultDescription">Default Meta Description</Label>
            <Textarea
              id="defaultDescription"
              name="defaultDescription"
              defaultValue={settings.defaultDescription ?? ""}
              placeholder="Default description for search results"
              rows={3}
            />
          </FieldError>

          <FieldError state={state} name="defaultOgImage">
            <Label htmlFor="defaultOgImage">Default OG Image</Label>
            <Input
              id="defaultOgImage"
              name="defaultOgImage"
              defaultValue={settings.defaultOgImage ?? ""}
              placeholder="https://example.com/og-image.jpg or /og-image.jpg"
            />
          </FieldError>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Robots and Verification</CardTitle>
          <CardDescription>
            Control site-wide robots defaults and search engine verification values.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CheckboxField
            id="defaultRobotsIndex"
            name="defaultRobotsIndex"
            label="Allow indexing by default"
            description="Applied as the default robots meta tag on public pages."
            defaultChecked={settings.defaultRobotsIndex}
          />
          <CheckboxField
            id="defaultRobotsFollow"
            name="defaultRobotsFollow"
            label="Allow following links by default"
            description="Applied as the default follow directive on public pages."
            defaultChecked={settings.defaultRobotsFollow}
          />

          <FieldError state={state} name="robotsDisallowPaths">
            <Label htmlFor="robotsDisallowPaths">Robots Disallow Paths</Label>
            <Textarea
              id="robotsDisallowPaths"
              name="robotsDisallowPaths"
              defaultValue={settings.robotsDisallowPaths ?? ""}
              placeholder="/admin\n/private"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              One path per line. Each path must start with /.
            </p>
          </FieldError>

          <FieldError state={state} name="googleSiteVerification">
            <Label htmlFor="googleSiteVerification">Google Site Verification</Label>
            <Input
              id="googleSiteVerification"
              name="googleSiteVerification"
              defaultValue={settings.googleSiteVerification ?? ""}
            />
          </FieldError>

          <FieldError state={state} name="bingSiteVerification">
            <Label htmlFor="bingSiteVerification">Bing Site Verification</Label>
            <Input
              id="bingSiteVerification"
              name="bingSiteVerification"
              defaultValue={settings.bingSiteVerification ?? ""}
            />
          </FieldError>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organization and Schema</CardTitle>
          <CardDescription>
            Optional organization details and global JSON-LD structured data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldError state={state} name="organizationName">
            <Label htmlFor="organizationName">Organization Name</Label>
            <Input
              id="organizationName"
              name="organizationName"
              defaultValue={settings.organizationName ?? ""}
            />
          </FieldError>

          <FieldError state={state} name="organizationLogo">
            <Label htmlFor="organizationLogo">Organization Logo</Label>
            <Input
              id="organizationLogo"
              name="organizationLogo"
              defaultValue={settings.organizationLogo ?? ""}
              placeholder="https://example.com/logo.png or /logo.png"
            />
          </FieldError>

          <FieldError state={state} name="organizationSchema">
            <Label htmlFor="organizationSchema">Organization Schema</Label>
            <Textarea
              id="organizationSchema"
              name="organizationSchema"
              defaultValue={settings.organizationSchema ?? ""}
              placeholder='{"@context":"https://schema.org","@type":"Organization"}'
              rows={5}
              className="font-mono text-xs"
            />
          </FieldError>

          <FieldError state={state} name="websiteSchema">
            <Label htmlFor="websiteSchema">Website Schema</Label>
            <Textarea
              id="websiteSchema"
              name="websiteSchema"
              defaultValue={settings.websiteSchema ?? ""}
              placeholder='{"@context":"https://schema.org","@type":"WebSite"}'
              rows={5}
              className="font-mono text-xs"
            />
          </FieldError>
        </CardContent>
      </Card>

      {state.message && <p className="text-sm text-destructive">{state.message}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Settings
        </Button>
      </div>
    </form>
  );
}

function FieldError({
  children,
  state,
  name,
}: {
  children: React.ReactNode;
  state: SiteSeoSettingsFormState;
  name: string;
}) {
  const error = state.errors?.[name]?.[0];

  return (
    <div className="space-y-2">
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function CheckboxField({
  id,
  name,
  label,
  description,
  defaultChecked,
}: {
  id: string;
  name: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 size-4 rounded border border-input"
      />
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
