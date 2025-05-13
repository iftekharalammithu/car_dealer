import { MultiStapFormEnum } from "./types";

export const routes = {
  home: "/",
  singleClassified: (slug: string) => `/inventory/${slug}`,
  reserve: (slug: string, step: MultiStapFormEnum) =>
    `/inventory/${slug}/reserve?step=${step}`,
  favorites: "/favourites",
  inventory: "/inventory",
  notAvailable: (slug: string) => `/inventory/${slug}/not-available`,
};
