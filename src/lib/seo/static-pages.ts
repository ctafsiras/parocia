export const STATIC_PAGES = [
  {
    key: "home",
    label: "Homepage",
    path: "/",
  },
  {
    key: "about",
    label: "About Us",
    path: "/about",
  },
] as const;

export type StaticPage = (typeof STATIC_PAGES)[number];
export type StaticPageKey = StaticPage["key"];

export function getStaticPageByKey(pageKey: string) {
  return STATIC_PAGES.find((page) => page.key === pageKey);
}

export function getStaticPageByPath(path: string) {
  return STATIC_PAGES.find((page) => page.path === path);
}

export function isStaticPageKey(pageKey: string): pageKey is StaticPageKey {
  return STATIC_PAGES.some((page) => page.key === pageKey);
}
