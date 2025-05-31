import { routes } from "./route";

export const CLASSIFIED_PER_PAGE = 12;

export const navLinks = [
  {
    id: 1,
    href: routes.home,
    label: "Home",
  },
  {
    id: 2,
    href: routes.inventory,
    label: "Inventory",
  },
];

export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
export const MAX_IMAGE_SIZE = 20 * 1000 * 1000;
