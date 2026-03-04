import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "../../../_components/admin-shell";
import { ProductForm } from "../../../_components/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Product
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Update &quot;{product.name}&quot; product details.
          </p>
        </div>
        <ProductForm product={product} categories={categories} />
      </div>
    </AdminShell>
  );
}
