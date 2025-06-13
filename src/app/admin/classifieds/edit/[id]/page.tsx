import { validateIDSchema2 } from "@/app/schemas/id.schema";
import Classified_Form from "@/components/classified/Classified-Form";
import { routes } from "@/config/route";
import { PageProps } from "@/config/types";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React from "react";

const EditClassified = async (props: PageProps) => {
  const params = await props.params;
  const { data, success } = validateIDSchema2.safeParse({
    id: String(params?.id),
  });

  if (!success) redirect(routes.admin.classifieds);

  const classified = await prisma.classified.findUnique({
    where: { id: data.id },
    include: { images: true },
  });

  if (!classified) redirect(routes.admin.classifieds);
  console.log(classified);
  return (
    <div>
      <h1>{data.id}</h1>
      <Classified_Form classified={classified}></Classified_Form>
    </div>
  );
};

export default EditClassified;
