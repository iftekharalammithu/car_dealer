import { ClassifiedStatus } from "@prisma/client";
import { routes } from "./route";
import { BadgeProps } from "@/components/ui/badge";

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
export const Max_Image = 20;
export const sortorder = ["asc", "desc"];
export const classifiedBadgeMap: Record<
  ClassifiedStatus,
  BadgeProps["variant"]
> = {
  [ClassifiedStatus.DRAFT]: "secondary",
  [ClassifiedStatus.LIVE]: "default",
  [ClassifiedStatus.SOLD]: "destructive",
};
