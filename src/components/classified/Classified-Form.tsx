"use client";
import {
  updateClassifiedSchema,
  updateClassifiedType,
} from "@/app/schemas/Classified.Schema";
import { ClassifiedWithImages } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";
import { updateClassifiedAction } from "@/actions/Classified";
import Classifiedformfields from "./Classified_form_fields";
import { CurrencyCode, OdoUnit } from "@prisma/client";

interface ClassifiedFormProps {
  classified: ClassifiedWithImages;
}

function extracKey(url: string) {
  const nextUrl = new URL(url);
  nextUrl.href = url;

  const regex = /uploads\/.+/;
  const match = url.match(regex);
  return match ? match[0] : url;
}

const Classified_Form = ({ classified }: ClassifiedFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<updateClassifiedType>({
    resolver: zodResolver(updateClassifiedSchema),
    defaultValues: {
      id: classified.id,
      odoUnit: OdoUnit.MILES,
      currency: CurrencyCode.GBP,
      ...(classified && {
        images: classified.images
          ? classified.images.map((image) => ({
              ...image,
              id: image.id,
              percentage: 100,
              key: extracKey(image.src),
              done: true,
            }))
          : [],
        make: classified.makeId,
        model: classified.modelId,
        modelVariant: classified.modelVariantId,
        year: classified.year.toString(),
        vrm: classified.vrm ?? "",
        description: classified.description ?? "",
        fuelType: classified.fuelType,
        bodyType: classified.bodyType,
        transmission: classified.transmission,
        color: classified.color,
        ulezCompliance: classified.ulezCompliance,
        status: classified.status,
        odoReading: classified.odoReading,
        seats: classified.seats,
        doors: classified.doors,
        price: classified.price / 100,
      }),
    },
  });

  const classifiedSubmit: SubmitHandler<updateClassifiedType> = (data) => {
    startTransition(async () => {
      const { success, message } = await updateClassifiedAction(data);
      if (success) {
        toast.success("Classified updated successfully");
      } else {
        toast.error(message || "Failed to update classified");
      }
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(classifiedSubmit)}>
          <h1 className=" text-3xl font-bold mb-4 text-muted ">
            Upload Vehicle
          </h1>
          <div className="w-full mx-auto grid grid-cols-2 gap-6">
            <Classifiedformfields></Classifiedformfields>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Classified_Form;
