"use server";
import { CurrencyCode } from "@prisma/client";
import { auth } from "@/auth";
import { StreambleSkeletonProps } from "@/components/Admin/Classified/StreambleSkeleton";
import { routes } from "@/config/route";
import prisma from "@/lib/prismadb";
import { generateThumbHashFromSrcUrl } from "@/lib/thumb-hash-server";
import { randomInt } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { createPngDataUri } from "unlazy/thumbhash";

export const createClassifiedAction = async (data: StreambleSkeletonProps) => {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  let success = false;
  let classifiedId: string | null = null;

  try {
    const model = await prisma.model.findUnique({
      where: { id: data.modelId as string },
    });
    const make = await prisma.make.findUnique({
      where: { id: data.makeId as string },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;
    if (data.modelVariantId) {
      const modelvariant = await prisma.modelVariant.findUnique({
        where: { id: data.modelVariant as string },
      });
      if (modelvariant) {
        title = `${title} ${modelvariant.name}`;
      }
    }
    let slug = slugify(`${title} ${data.vrm ?? randomInt(100000, 999999)}`);

    const slugLikeFound = await prisma.classified.count({
      where: { slug: { contains: slug, mode: "insensitive" } },
    });

    if (slugLikeFound) {
      slug = slugify(`${title} ${data.vrm} ${slugLikeFound + 1}`);
    }

    const thumnhash = await generateThumbHashFromSrcUrl(data.image as string);
    const url = createPngDataUri(thumnhash);

    const classified = await prisma.classified.create({
      data: {
        slug,
        title,
        year: Number(data.year),
        makeId: data.makeId as string,
        modelId: data.modelId as string,
        ...(data.modelVariantId && {
          modelVariantId: data.modelVariantId as string,
        }),
        vrm: data?.vrm ? data.vrm : null,
        price: 0,
        odoReading: data.odoReading,
        currency: CurrencyCode.GBP,
        odoUnit: data.odoUnit,
        fuelType: data.fuelType,
        bodyType: data.bodyType,
        color: data.color,
        transmission: data.transmission,
        ulezCompliance: data.ulezCompliance,
        description: data.description,
        doors: data.doors,
        seats: data.seats,
        images: {
          create: {
            isMain: true,
            blurhash: url,
            src: data.image as string,
            alt: title,
          },
        },
      },
    });
    if (classified) {
      classifiedId = classified.id;
      success = true;
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
  if (success && classifiedId) {
    revalidatePath(routes.admin.classifieds);
    redirect(routes.admin.editclassified(classifiedId));
  } else {
    return { success: false, message: "Failed to create Classified" };
  }
};
