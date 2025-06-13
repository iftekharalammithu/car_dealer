import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/route";
import { Favourites } from "@/config/types";
import { redis } from "@/lib/radis_store";
import { setSourceId } from "@/lib/source_id";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (res: NextRequest) => {
  const body = await res.json();
  // console.log("api called");
  // console.log(body);
  const { data, error } = validateIdSchema.safeParse(body);
  // console.log(data);

  if (!data) {
    return NextResponse.json({ error: error.message });
  }
  // console.log(data.classifiedId);

  // if (typeof data.id !== "number") {
  //   return NextResponse.json({ error: "id must be a number" });
  // }

  const sourceId = await setSourceId();

  const storedFavourites = await redis.get<Favourites>(sourceId);
  const favourites: Favourites = storedFavourites || { ids: [] };

  if (favourites.ids.includes(data.classifiedId)) {
    favourites.ids = favourites.ids.filter((id) => id !== data.classifiedId);
  } else {
    favourites.ids.push(data.classifiedId);
  }
  await redis.set(sourceId, favourites);
  revalidatePath(routes.favorites);

  return NextResponse.json({ ids: favourites.ids }, { status: 200 });
};
