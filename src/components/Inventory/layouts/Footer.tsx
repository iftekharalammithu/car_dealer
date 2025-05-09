import NewsletterForm from "@/components/shared/NewsletterForm";
import { routes } from "@/config/route";
import { navLinks } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLink = [
  {
    id: 1,
    name: "Facebook",
    url: "https://www.facebook.com",
    icon: (
      <FaFacebook className=" w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
    ),
  },
  {
    id: 2,
    name: "Twitter",
    url: "https://www.twitter.com",
    icon: (
      <FaTwitter className=" w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
    ),
  },
  {
    id: 3,
    name: "Instagram",
    url: "https://www.instagram.com",
    icon: (
      <FaInstagram className=" w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
    ),
  },
  {
    id: 4,
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    icon: (
      <FaLinkedin className=" w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
    ),
  },
];

const Footer = () => {
  return (
    <footer className=" bg-gray-100  px-8 lg:px-0 py-8">
      <div className=" container mx-auto  grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className=" flex  justify-between space-y-4">
          <div className=" flex  flex-col items-left space-x-2">
            <Link className=" flex items-center" href={routes.home}>
              <Image
                width={50}
                height={50}
                alt="logo"
                className="relative"
                src="/web-app-manifest-512x512.png"
              ></Image>
            </Link>
            <div className=" flex space-x-4">
              {socialLink.map((link) => {
                return (
                  <Link href={link.url} key={link.id}>
                    {link.icon}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className=" space-y-2">
            <ul className=" space-y-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    className=" flex items-center gap-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 "
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <NewsletterForm></NewsletterForm>
        </div>
        <div className=" container  mx-auto mt-8 text-center text-gray-700">
          <h4 className=" text-lg font-bold text-primary">Company Info</h4>
          <p>Company No. 1235467544 | Vat No. 8541415641</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            dolores obcaecati officiis fugit culpa nihil ratione alias iure
            nostrum fugiat?
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
