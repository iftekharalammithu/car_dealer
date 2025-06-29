import { MultiStapFormEnum } from "./types";

export const routes = {
  home: "/",
  singleClassified: (slug: string) => `/inventory/${slug}`,
  reserve: (slug: string, step: MultiStapFormEnum) =>
    `/inventory/${slug}/reserved?step=${step}`,
  success: (slug: string) => `/inventory/${slug}/success`,
  favorites: "/favourites",
  inventory: "/inventory",
  notAvailable: (slug: string) => `/inventory/${slug}/not-available`,
  signIn: "/auth/signin",
  challenge: "/auth/challenge",
  admin: {
    dashboard: "/admin/dashboard",
    classifieds: "/admin/classifieds",
    customers: "/admin/customers",
    editCustomer: (id: string) => `/admin/customers/edit/${id}`,
    setting: "/admin/setting",
    editclassified: (id: string) => `/admin/classifieds/edit/${id}`,
  },
};
