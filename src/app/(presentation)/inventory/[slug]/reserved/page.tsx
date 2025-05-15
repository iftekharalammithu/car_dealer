import { MultiStepFormSchema } from "@/app/schemas/form.schema";
import SelectDate from "@/components/Reserved/SelectDate";
import SubmitDetails from "@/components/Reserved/SubmitDetails";
import Welcome from "@/components/Reserved/Welcome";
import { MultiStapFormEnum, PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import React from "react";

const MAP_STEP_TO_COMPONENT = {
  [MultiStapFormEnum.WELCOME]: Welcome,
  [MultiStapFormEnum.SELECT_DATE]: SelectDate,
  [MultiStapFormEnum.SUBMIT_DETAILS]: SubmitDetails,
};

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug = params?.slug;
  const step = searchParams?.step;

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug,
    step: Number(step),
  });

  if (!success) {
    notFound();
  }
  const classified = await prisma.classified.findUnique({
    where: { slug: data.slug },
    include: { make: true },
  });
  if (!classified) {
    notFound();
  }

  const Component = MAP_STEP_TO_COMPONENT[data.step];
  return (
    <Component
      searchParams={searchParams}
      params={params}
      classified={classified}
    ></Component>
  );
};

export default page;
