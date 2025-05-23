"use client";
import { routes } from "@/config/route";
import { AnimatePresence, Variants, easeInOut, motion } from "framer-motion";
import {
  CarFrontIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ActiveLink from "../ui/ActiveLink";

const navigarion = [
  {
    name: "Dashboard",
    href: routes.admin.dashboard,
    icon: LayoutDashboardIcon,
  },
  {
    name: "Classified",
    href: routes.admin.classifieds,
    icon: CarFrontIcon,
  },
  {
    name: "Customers",
    href: routes.admin.customers,
    icon: UsersIcon,
  },
  {
    name: "Setting",
    href: routes.admin.setting,
    icon: SettingsIcon,
  },
];

const AdminSidebar = () => {
  const [isSidebarExpanded, setisSidebarExpanded] = useState(false);
  const handleSidebarHover = useCallback((expanded: boolean) => {
    setisSidebarExpanded(expanded);
  }, []);

  const sideBarVariants: Variants = {
    expanded: { width: 256 },
    collapsed: { width: "fit-content" },
  };
  const menuTextVariants: Variants = {
    expanded: {
      opacity: 1,
      width: "auto",
      marginLeft: 10,
    },
    collapsed: {
      opacity: 0,
      width: 0,
    },
  };

  const logoVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
    exit: { opacity: 0 },
  };
  return (
    <motion.div
      className=" bg-black/20 h-screen overflow-hidden flex flex-col"
      animate={isSidebarExpanded ? "expanded" : "collapsed"}
      variants={sideBarVariants}
      initial="collapsed"
      transition={{ duration: 0.3, ease: easeInOut }}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => handleSidebarHover(false)}
    >
      <div className=" flex flex-col grow px-4 ">
        <Link href={routes.home}>
          <div className="relative h-[60px]  w-full">
            <AnimatePresence initial={false} mode="wait">
              {isSidebarExpanded ? (
                <motion.div
                  key={"expanded-logo"}
                  className=" absolute inset-0 "
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  exit={"exit"}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={"/web-app-manifest-192x192.png"}
                    fill
                    className=" object-contain object-left"
                    alt="logo"
                  ></Image>
                </motion.div>
              ) : (
                <motion.div
                  key={"collapsed-logo"}
                  className=" absolute inset-0 w-full  "
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  exit={"exit"}
                  transition={{ duration: 0.1 }}
                >
                  <Image
                    src={"/web-app-manifest-192x192.png"}
                    fill
                    className=" object-contain  "
                    alt="logo"
                  ></Image>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
        <nav className=" flex flex-col gap-2">
          {navigarion.map((item) => {
            return (
              <ActiveLink
                className=" flex  rounded-md items-center p-2"
                key={item.name}
                href={item.href}
              >
                <div className=" flex items-center justify-center">
                  <item.icon
                    aria-hidden="true"
                    className=" w-6 h-6 shrink-0"
                  ></item.icon>
                </div>
                <motion.span
                  variants={menuTextVariants}
                  animate={isSidebarExpanded ? "expanded" : "collapsed"}
                  initial="collapsed"
                  transition={{ duration: 0.3, ease: easeInOut }}
                  className=" whitespace-nowrap overflow-hidden"
                >
                  {item.name}
                </motion.span>
              </ActiveLink>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
