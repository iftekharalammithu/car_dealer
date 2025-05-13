import ClassifiedView from "@/components/classified/ClassifiedView";
import { routes } from "@/config/route";
import { PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { ClassifiedStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import React from "react";

const page = async (props: PageProps) => {
  const params = await props?.params;
  const slug = decodeURIComponent(params?.slug as string);
  console.log(slug);
  if (!slug) {
    notFound();
  }

  const classified = await prisma.classified.findUnique({
    where: { slug },
    include: { make: true, images: true },
  });
  if (!classified) {
    notFound();
  }
  if (classified.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(slug));
  }
  return (
    <div>
      <ClassifiedView {...classified}></ClassifiedView>
    </div>
  );
};

export default page;
