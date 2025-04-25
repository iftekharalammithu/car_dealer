import { MultiStapFormEnum } from "./types";

export const routes = {
  home: "/",
  singleClassified: (sing: string) => `/inventory/${sing}`,
  reserve: (slug: string, step: MultiStapFormEnum) =>
    `/inventory/${slug}/reserve?step=${step}`,
  favorites: "/favorites",
  inventory: "/inventory",
};
