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
  upsertStaticPageSeo,
  type StaticPageSeoFormState,
} from "@/lib/actions/seo-actions";
import type { StaticPageSeoRecord } from "@/lib/seo/queries";
import type { StaticPage } from "@/lib/seo/static-pages";

export function StaticPageSeoForm({
  page,
  pageSeo,
  defaultRobotsIndex,
  defaultRobotsFollow,
}: {
  page: StaticPage;
  pageSeo: StaticPageSeoRecord | null;
  defaultRobotsIndex: boolean;
  defaultRobotsFollow: boolean;
}) {
  const [state, formAction, isPending] = useActionState<StaticPageSeoFormState, FormData>(
    upsertStaticPageSeo.bind(null, page.key),
    {}
  );
  const metaTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    metaTitleRef.current?.focus();
  }, []);

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>
            This page is registered in code and its route cannot be changed from admin.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Page</Label>
            <div className="rounded-lg border bg-muted px-3 py-2 text-sm">{page.label}</div>
          </div>
          <div className="space-y-2">
            <Label>Route</Label>
            <div className="rounded-lg border bg-muted px-3 py-2 text-sm">{page.path}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
          <CardDescription>
            Set title, description, canonical path, and social sharing fields.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldError state={state} name="metaTitle">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              ref={metaTitleRef}
              defaultValue={pageSeo?.metaTitle ?? ""}
              placeholder="Homepage title for search engines"
            />
            <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
          </FieldError>

          <FieldError state={state} name="metaDescription">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              defaultValue={pageSeo?.metaDescription ?? ""}
              placeholder="Short description for search results"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
          </FieldError>

          <FieldError state={state} name="canonicalPath">
            <Label htmlFor="canonicalPath">Canonical Path Override</Label>
            <Input
              id="canonicalPath"
              name="canonicalPath"
              defaultValue={pageSeo?.canonicalPath ?? ""}
              placeholder={page.path}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use the registered route. Use a path starting with /.
            </p>
          </FieldError>

          <FieldError state={state} name="ogTitle">
            <Label htmlFor="ogTitle">Open Graph Title</Label>
            <Input id="ogTitle" name="ogTitle" defaultValue={pageSeo?.ogTitle ?? ""} />
          </FieldError>

          <FieldError state={state} name="ogDescription">
            <Label htmlFor="ogDescription">Open Graph Description</Label>
            <Textarea
              id="ogDescription"
              name="ogDescription"
              defaultValue={pageSeo?.ogDescription ?? ""}
              rows={3}
            />
          </FieldError>

          <FieldError state={state} name="ogImage">
            <Label htmlFor="ogImage">Open Graph Image</Label>
            <Input
              id="ogImage"
              name="ogImage"
              defaultValue={pageSeo?.ogImage ?? ""}
              placeholder="https://example.com/og-image.jpg or /og-image.jpg"
            />
          </FieldError>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indexing and Structured Data</CardTitle>
          <CardDescription>
            Control how this page appears in search engines and provide page-specific JSON-LD.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CheckboxField
            id="robotsIndex"
            name="robotsIndex"
            label="Allow indexing"
            description="If disabled, the page will render noindex in metadata."
            defaultChecked={pageSeo?.robotsIndex ?? defaultRobotsIndex}
          />
          <CheckboxField
            id="robotsFollow"
            name="robotsFollow"
            label="Allow link following"
            description="If disabled, the page will render nofollow in metadata."
            defaultChecked={pageSeo?.robotsFollow ?? defaultRobotsFollow}
          />
          <CheckboxField
            id="includeInSitemap"
            name="includeInSitemap"
            label="Include in sitemap"
            description="If disabled, the page will be excluded from sitemap.xml."
            defaultChecked={pageSeo?.includeInSitemap ?? true}
          />

          <FieldError state={state} name="schemaMarkup">
            <Label htmlFor="schemaMarkup">Schema Markup</Label>
            <Textarea
              id="schemaMarkup"
              name="schemaMarkup"
              defaultValue={pageSeo?.schemaMarkup ?? ""}
              placeholder='{"@context":"https://schema.org","@type":"WebPage"}'
              rows={6}
              className="font-mono text-xs"
            />
          </FieldError>
        </CardContent>
      </Card>

      {state.message && <p className="text-sm text-destructive">{state.message}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Page SEO
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
  state: StaticPageSeoFormState;
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
