export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminShell } from "./_components/admin-shell";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Package, FolderTree, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminDashboard() {
  const [productCount, categoryCount, recentProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of your catalog.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>Total Products</CardDescription>
                <Package className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl tabular-nums">
                {productCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>Total Categories</CardDescription>
                <FolderTree className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl tabular-nums">
                {categoryCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" asChild className="h-auto py-4 justify-start">
            <Link href="/admin/products/new">
              <Plus className="size-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Add Product</div>
                <div className="text-xs text-muted-foreground font-normal">
                  Create a new product entry
                </div>
              </div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4 justify-start">
            <Link href="/admin/categories/new">
              <Plus className="size-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Add Category</div>
                <div className="text-xs text-muted-foreground font-normal">
                  Create a new category
                </div>
              </div>
            </Link>
          </Button>
        </div>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>
                  Last {recentProducts.length} products added.
                </CardDescription>
              </div>
              {productCount > 0 && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/products">
                    View all
                    <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {recentProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No products yet. Create your first product to see it here.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="size-9 rounded-md border bg-muted overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.imageAlt}
                            className="size-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="hover:underline"
                        >
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs">
                          {product.category.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.createdAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
