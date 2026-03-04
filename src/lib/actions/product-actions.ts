"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductFormState = {
  errors?: {
    name?: string[];
    slug?: string[];
    description?: string[];
    image?: string[];
    imageAlt?: string[];
    categoryId?: string[];
    metaTitle?: string[];
    metaDescription?: string[];
    schemaMarkup?: string[];
  };
  message?: string;
};

function validateProduct(formData: FormData) {
  const errors: ProductFormState["errors"] = {};

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const imageAlt = formData.get("imageAlt") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!name || name.trim().length === 0) {
    errors.name = ["Name is required"];
  }

  if (!slug || slug.trim().length === 0) {
    errors.slug = ["Slug is required"];
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.slug = ["Slug must be lowercase letters, numbers, and hyphens only"];
  }

  if (!description || description.trim().length === 0) {
    errors.description = ["Description is required"];
  }

  if (!image || image.trim().length === 0) {
    errors.image = ["Image URL is required"];
  }

  if (!imageAlt || imageAlt.trim().length === 0) {
    errors.imageAlt = ["Image alt text is required"];
  }

  if (!categoryId || categoryId.trim().length === 0) {
    errors.categoryId = ["Category is required"];
  }

  return errors;
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const errors = validateProduct(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const slug = (formData.get("slug") as string).trim();

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return { errors: { slug: ["A product with this slug already exists"] } };
  }

  await prisma.product.create({
    data: {
      name: (formData.get("name") as string).trim(),
      slug,
      description: (formData.get("description") as string).trim(),
      image: (formData.get("image") as string).trim(),
      imageAlt: (formData.get("imageAlt") as string).trim(),
      categoryId: (formData.get("categoryId") as string).trim(),
      metaTitle: (formData.get("metaTitle") as string) || null,
      metaDescription: (formData.get("metaDescription") as string) || null,
      schemaMarkup: (formData.get("schemaMarkup") as string) || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const errors = validateProduct(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const slug = (formData.get("slug") as string).trim();

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return { errors: { slug: ["A product with this slug already exists"] } };
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: (formData.get("name") as string).trim(),
      slug,
      description: (formData.get("description") as string).trim(),
      image: (formData.get("image") as string).trim(),
      imageAlt: (formData.get("imageAlt") as string).trim(),
      categoryId: (formData.get("categoryId") as string).trim(),
      metaTitle: (formData.get("metaTitle") as string) || null,
      metaDescription: (formData.get("metaDescription") as string) || null,
      schemaMarkup: (formData.get("schemaMarkup") as string) || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}
