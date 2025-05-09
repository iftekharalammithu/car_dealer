import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/config/route";
import { HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navLinks = [
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

const Header = () => {
  return (
    <footer className=" flex items-center justify-center bg-transparent h-16 px-4 gap-x-6">
      <div className=" flex items-center flex-1">
        <Link href={routes.home} className=" flex  items-center gap-2">
          <Image
            width={50}
            height={50}
            alt="logo"
            className=" relative"
            src="/web-app-manifest-512x512.png"
          ></Image>
        </Link>
      </div>
      <nav className="  hidden md:block">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            className=" group font-heading rounded px-3  py-2 text-base  hover:text-primary text-foreground  duration-300 transition-all ease-in-out font-semibold uppercase "
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button asChild variant={"ghost"}>
        <Link href={routes.favorites} className=" relative inline-block group">
          <HeartIcon size="icon"></HeartIcon>
        </Link>
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"link"}
            size={"icon"}
            className=" md:hidden border-none"
          >
            <MenuIcon className=" h-6 w-6"></MenuIcon>
            <SheetTitle className=" sr-only">Toggle Nav Menu</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className=" w-full max-w-xs p-4">
          <nav className=" grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                className=" flex items-center gap-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 "
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </footer>
  );
};

export default Header;
