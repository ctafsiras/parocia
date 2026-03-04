export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminShell } from "../_components/admin-shell";
import { DeleteButton } from "../_components/delete-button";
import { deleteProduct } from "@/lib/actions/product-actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Package } from "lucide-react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category: categoryFilter, search } = await searchParams;

  const where: Record<string, unknown> = {};
  if (categoryFilter) {
    where.categoryId = categoryFilter;
  }
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your product catalog.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="size-4" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <form className="flex items-center gap-3 flex-1" method="GET">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              defaultValue={search ?? ""}
              className="flex h-8 w-full max-w-xs rounded-lg border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <select
              name="category"
              defaultValue={categoryFilter ?? ""}
              className="flex h-8 rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Button type="submit" variant="secondary" size="sm">
              Filter
            </Button>
            {(search || categoryFilter) && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/products">Clear</Link>
              </Button>
            )}
          </form>
        </div>

        <Card>
          <CardContent className="p-0">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Package className="size-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">
                  {search || categoryFilter
                    ? "No products found"
                    : "No products yet"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {search || categoryFilter
                    ? "Try adjusting your search or filter criteria."
                    : "Create your first product to get started."}
                </p>
                {!search && !categoryFilter && (
                  <Button asChild size="sm">
                    <Link href="/admin/products/new">
                      <Plus className="size-4" />
                      Add Product
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SEO</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => {
                    const hasSeo = !!(
                      product.metaTitle || product.metaDescription
                    );
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="size-9 rounded-md border bg-muted overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.imageAlt}
                              className="size-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            /{product.slug}
                          </code>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs">
                            {product.category.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          {hasSeo ? (
                            <span className="inline-flex items-center rounded-md bg-emerald-500/10 text-emerald-500 px-2 py-0.5 text-xs">
                              Configured
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              Not set
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon-sm" asChild>
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                              >
                                <Pencil className="size-3.5" />
                              </Link>
                            </Button>
                            <DeleteButton
                              id={product.id}
                              entityName="Product"
                              onDelete={deleteProduct}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
