import { Model, ModelVariant } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const params = new URL(req.url).searchParams;
  console.log("This is from taxonomy route", params.get("make"));
  try {
    const makes: { id: string; name: string }[] = await prisma.make.findMany({
      select: { id: true, name: true },
      orderBy: {
        name: "asc",
      },
    });
    let models: Model[] = [];

    if (params.get("make")) {
      models = await prisma.model.findMany({
        select: { id: true, name: true },
        where: {
          make: { id: Number(params.get("make")) },
        },
      });
    }

    let modelVariants: ModelVariant[] = [];
    if (params.get("make") && params.get("model")) {
      modelVariants = await prisma.modelVariant.findMany({
        where: {
          model: { id: Number(params.get("model")) },
        },
      });
    }

    const lvMakes = makes.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));

    const lvModel = models.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));

    const lvModelVariant = modelVariants.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));

    console.log(lvMakes, lvModel, lvModelVariant);

    return NextResponse.json(
      {
        makes: lvMakes,
        models: lvModel,
        modelVariants: lvModelVariant,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
