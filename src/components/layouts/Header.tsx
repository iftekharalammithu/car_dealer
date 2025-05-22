import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/config/constants";
import { routes } from "@/config/route";
import { Favourites } from "@/config/types";
import { redis } from "@/lib/radis_store";
import { getSourceId } from "@/lib/source_id";
import { auth } from "@/auth";
import { HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignOutForm from "../Auth/SignOutForm";

const Header = async () => {
  const session = await auth();
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  return (
    <header className=" flex items-center justify-center bg-transparent h-16 px-4 gap-x-6">
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
      {session ? (
        <div className=" items-center md:flex gap-x-6 hidden">
          <Link href={routes.admin.dashboard} className=" text-foreground">
            BackOffice
          </Link>
          <SignOutForm></SignOutForm>
        </div>
      ) : (
        <Button
          asChild
          size="icon"
          className=" relative inline-block group"
          variant={"ghost"}
        >
          <Link href={routes.favorites}>
            <div className=" flex group-hover:bg-pink-200 duration-200  transition-colors ease-in-out items-center justify-center  w-10 h-10 rounded-full bg-muted">
              <HeartIcon className=" w-6 h-6  text-primary group-hover:text-white group-hover:fill-white"></HeartIcon>
            </div>
            <div className=" absolute -top-1.5  -right-1.5 items-center h-5 w-5  justify-center text-white flex bg-pink-500 rounded-full group-hover:bg-primary">
              <span className="text-xs">
                {favourites ? favourites.ids.length : 0}
              </span>
            </div>
          </Link>
        </Button>
      )}
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
    </header>
  );
};

export default Header;
