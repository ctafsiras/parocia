export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminShell } from "../../_components/admin-shell";
import { ProductForm } from "../../_components/product-form";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            New Product
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {categories.length === 0 ? (
              <>
                You need at least one category first.{" "}
                <Link
                  href="/admin/categories/new"
                  className="text-primary underline underline-offset-4"
                >
                  Create a category
                </Link>
              </>
            ) : (
              "Add a new product to your catalog."
            )}
          </p>
        </div>
        {categories.length > 0 && <ProductForm categories={categories} />}
      </div>
    </AdminShell>
  );
}
