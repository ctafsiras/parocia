"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CategoryFormState = {
  errors?: {
    name?: string[];
    slug?: string[];
    description?: string[];
    image?: string[];
    imageAlt?: string[];
    metaTitle?: string[];
    metaDescription?: string[];
    schemaMarkup?: string[];
  };
  message?: string;
};

function validateCategory(formData: FormData) {
  const errors: CategoryFormState["errors"] = {};

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || name.trim().length === 0) {
    errors.name = ["Name is required"];
  }

  if (!slug || slug.trim().length === 0) {
    errors.slug = ["Slug is required"];
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.slug = ["Slug must be lowercase letters, numbers, and hyphens only"];
  }

  return errors;
}

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const errors = validateCategory(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const slug = (formData.get("slug") as string).trim();

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return { errors: { slug: ["A category with this slug already exists"] } };
  }

  await prisma.category.create({
    data: {
      name: (formData.get("name") as string).trim(),
      slug,
      description: (formData.get("description") as string) || null,
      image: (formData.get("image") as string) || null,
      imageAlt: (formData.get("imageAlt") as string) || null,
      metaTitle: (formData.get("metaTitle") as string) || null,
      metaDescription: (formData.get("metaDescription") as string) || null,
      schemaMarkup: (formData.get("schemaMarkup") as string) || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const errors = validateCategory(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const slug = (formData.get("slug") as string).trim();

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return { errors: { slug: ["A category with this slug already exists"] } };
  }

  await prisma.category.update({
    where: { id },
    data: {
      name: (formData.get("name") as string).trim(),
      slug,
      description: (formData.get("description") as string) || null,
      image: (formData.get("image") as string) || null,
      imageAlt: (formData.get("imageAlt") as string) || null,
      metaTitle: (formData.get("metaTitle") as string) || null,
      metaDescription: (formData.get("metaDescription") as string) || null,
      schemaMarkup: (formData.get("schemaMarkup") as string) || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}
