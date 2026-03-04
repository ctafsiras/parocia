import { AdminShell } from "../../_components/admin-shell";
import { CategoryForm } from "../../_components/category-form";

export default function NewCategoryPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            New Category
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create a new product category.
          </p>
        </div>
        <CategoryForm />
      </div>
    </AdminShell>
  );
}
