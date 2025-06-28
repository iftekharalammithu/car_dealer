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
import { updateClassifiedType } from "@/app/schemas/Classified.Schema";

export const createClassifiedAction = async (data: StreambleSkeletonProps) => {
  const session = await auth();
  // console.log(session);
  // console.log("Creating Classified with data:", data);

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

export const updateClassifiedAction = async (data: updateClassifiedType) => {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }
  let success = false;
  try {
    const makeId = data.make;
    const modelId = data.model;
    const modelVariantId = data.modelVariant ? data.modelVariant : null;

    const model = await prisma.model.findUnique({
      where: { id: data.model as string },
    });

    const make = await prisma.make.findUnique({
      where: { id: data.make as string },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;

    if (modelVariantId) {
      const modelvariant = await prisma.modelVariant.findUnique({
        where: { id: modelVariantId },
      });
      if (modelvariant) {
        title = `${title} ${modelvariant.name}`;
      }
    }
    let slug = slugify(`${title} ${data.vrm}`);

    const { classified, images } = await prisma.$transaction(
      async (prisma) => {
        await prisma.image.deleteMany({
          where: { classifiedId: data.id },
        });
        const imagesData = await Promise.all(
          data.images.map(async ({ src }, index) => {
            const hash = await generateThumbHashFromSrcUrl(data.images[0].src);
            const uri = createPngDataUri(hash);
            return {
              classifiedId: data.id,
              isMain: !index,
              blurhash: uri,
              src,
              alt: `${title} ${index + 1}`,
            };
          })
        );
        const images = await prisma.image.createManyAndReturn({
          data: imagesData,
        });
        const classified = await prisma.classified.update({
          where: { id: data.id },
          data: {
            slug,
            title,
            year: Number(data.year),
            makeId,
            modelId,
            ...(modelVariantId && { modelVariantId }),
            vrm: data.vrm,
            price: data.price,
            currency: data.currency,
            odoReading: data.odoReading,
            odoUnit: data.odoUnit,
            fuelType: data.fuelType,
            bodyType: data.bodyType,
            transmission: data.transmission,
            ulezCompliance: data.ulezCompliance,
            color: data.color,
            description: data.description,
            doors: data.doors,
            seats: data.seats,
            status: data.status,
            images: { set: images.map((image) => ({ id: image.id })) },
          },
        });
        return [classified, images];
      },
      { timeout: 10000 }
    );
    if (classified && images) {
      success = true;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
  if (success) {
    revalidatePath(routes.admin.classifieds);
    redirect(routes.admin.classifieds);
  } else {
    return { success: false, message: "Failed to update Classified" };
  }
};

export const deleteClassifiedAction = async (id: string) => {
  try {
    await prisma.classified.delete({
      where: {
        id,
      },
    });
    revalidatePath(routes.admin.classifieds);
    return { success: true, message: "Classified Deleted" };
  } catch (error) {
    console.log("Error Deleting Classified:", { error });
    return { success: false, message: "classified Delete Failed" };
  }
};
