"use client";

import { useActionState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  createCategory,
  updateCategory,
  type CategoryFormState,
} from "@/lib/actions/category-actions";
import { ChevronDown, ChevronUp, Save, Loader2 } from "lucide-react";
import { useState } from "react";

type CategoryData = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  imageAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  schemaMarkup: string | null;
};

export function CategoryForm({ category }: { category?: CategoryData }) {
  const isEditing = !!category;
  const [seoOpen, setSeoOpen] = useState(false);
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(category?.image ?? "");
  const nameRef = useRef<HTMLInputElement>(null);

  const boundAction = isEditing
    ? updateCategory.bind(null, category.id)
    : createCategory;

  const [state, formAction, isPending] = useActionState<CategoryFormState, FormData>(
    boundAction,
    {}
  );

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Basic information about this category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              ref={nameRef}
              placeholder="e.g. Hair Products"
              defaultValue={category?.name ?? ""}
              onChange={(e) => {
                if (!isEditing || slug === generateSlug(category?.name ?? "")) {
                  setSlug(generateSlug(e.target.value));
                }
              }}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="e.g. hair-products"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              URL: /categories/{slug || "..."}
            </p>
            {state.errors?.slug && (
              <p className="text-sm text-destructive">{state.errors.slug[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe this category..."
              rows={3}
              defaultValue={category?.description ?? ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl && (
              <div className="mt-2 relative w-full max-w-xs overflow-hidden rounded-lg border bg-muted">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input
              id="imageAlt"
              name="imageAlt"
              placeholder="Descriptive text for the image"
              defaultValue={category?.imageAlt ?? ""}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          className="cursor-pointer select-none"
          onClick={() => setSeoOpen(!seoOpen)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Search engine optimization fields.
              </CardDescription>
            </div>
            {seoOpen ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        {seoOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                placeholder="Page title for search engines"
                defaultValue={category?.metaTitle ?? ""}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 50-60 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                placeholder="Brief description for search engine results"
                rows={2}
                defaultValue={category?.metaDescription ?? ""}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 150-160 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schemaMarkup">Schema / Structured Data</Label>
              <Textarea
                id="schemaMarkup"
                name="schemaMarkup"
                placeholder='{"@context": "https://schema.org", ...}'
                rows={4}
                className="font-mono text-xs"
                defaultValue={category?.schemaMarkup ?? ""}
              />
              <p className="text-xs text-muted-foreground">
                JSON-LD structured data for rich search results.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {isEditing ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
