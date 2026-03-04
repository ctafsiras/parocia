import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "../../../_components/admin-shell";
import { CategoryForm } from "../../../_components/category-form";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Category
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Update &quot;{category.name}&quot; category details.
          </p>
        </div>
        <CategoryForm category={category} />
      </div>
    </AdminShell>
  );
}
