export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminShell } from "../_components/admin-shell";
import { DeleteButton } from "../_components/delete-button";
import { deleteCategory } from "@/lib/actions/category-actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, FolderTree } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Categories
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your product categories.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/categories/new">
              <Plus className="size-4" />
              Add Category
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <FolderTree className="size-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No categories yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first category to start organizing products.
                </p>
                <Button asChild size="sm">
                  <Link href="/admin/categories/new">
                    <Plus className="size-4" />
                    Add Category
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>SEO</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => {
                    const hasSeo = !!(
                      category.metaTitle || category.metaDescription
                    );
                    return (
                      <TableRow key={category.id}>
                        <TableCell>
                          {category.image ? (
                            <div className="size-9 rounded-md border bg-muted overflow-hidden">
                              <img
                                src={category.image}
                                alt={category.imageAlt ?? category.name}
                                className="size-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="size-9 rounded-md border bg-muted flex items-center justify-center">
                              <FolderTree className="size-3.5 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            /{category.slug}
                          </code>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs tabular-nums">
                            {category._count.products}
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
                                href={`/admin/categories/${category.id}/edit`}
                              >
                                <Pencil className="size-3.5" />
                              </Link>
                            </Button>
                            <DeleteButton
                              id={category.id}
                              entityName="Category"
                              onDelete={deleteCategory}
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
