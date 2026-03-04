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
  createProduct,
  updateProduct,
  type ProductFormState,
} from "@/lib/actions/product-actions";
import { ChevronDown, ChevronUp, Save, Loader2 } from "lucide-react";
import { useState } from "react";

type CategoryOption = {
  id: string;
  name: string;
};

type ProductData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
  categoryId: string;
  metaTitle: string | null;
  metaDescription: string | null;
  schemaMarkup: string | null;
};

export function ProductForm({
  product,
  categories,
}: {
  product?: ProductData;
  categories: CategoryOption[];
}) {
  const isEditing = !!product;
  const [seoOpen, setSeoOpen] = useState(false);
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const nameRef = useRef<HTMLInputElement>(null);

  const boundAction = isEditing
    ? updateProduct.bind(null, product.id)
    : createProduct;

  const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(
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
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Basic information about this product.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              ref={nameRef}
              placeholder="e.g. Argan Oil Shampoo"
              defaultValue={product?.name ?? ""}
              onChange={(e) => {
                if (!isEditing || slug === generateSlug(product?.name ?? "")) {
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
              placeholder="e.g. argan-oil-shampoo"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              URL: /products/{slug || "..."}
            </p>
            {state.errors?.slug && (
              <p className="text-sm text-destructive">{state.errors.slug[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product?.categoryId ?? ""}
              className="flex h-8 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {state.errors?.categoryId && (
              <p className="text-sm text-destructive">
                {state.errors.categoryId[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe this product..."
              rows={4}
              defaultValue={product?.description ?? ""}
            />
            {state.errors?.description && (
              <p className="text-sm text-destructive">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              placeholder="https://example.com/product.jpg"
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
            {state.errors?.image && (
              <p className="text-sm text-destructive">
                {state.errors.image[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input
              id="imageAlt"
              name="imageAlt"
              placeholder="Descriptive text for the image"
              defaultValue={product?.imageAlt ?? ""}
            />
            {state.errors?.imageAlt && (
              <p className="text-sm text-destructive">
                {state.errors.imageAlt[0]}
              </p>
            )}
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
                defaultValue={product?.metaTitle ?? ""}
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
                defaultValue={product?.metaDescription ?? ""}
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
                defaultValue={product?.schemaMarkup ?? ""}
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
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
