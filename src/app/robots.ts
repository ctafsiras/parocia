import type { MetadataRoute } from "next";
import { getSiteSeoSettings } from "@/lib/seo/queries";
import { buildRobotsConfig } from "@/lib/seo/robots";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSeoSettings();
  return buildRobotsConfig(settings);
}
