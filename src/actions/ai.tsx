"use server";
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  StreamableValue,
} from "ai/rsc";
import { CoreMessage, generateObject, UserContent } from "ai";
import { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import StreambleSkeleton, {
  StreambleSkeletonProps,
} from "@/components/Admin/Classified/StreambleSkeleton";
import { ClassifiedTaxonomyAISchema } from "@/app/schemas/Classified-Schema-ai";
import { mapTaxonomyToCreate } from "@/lib/ai-utils";

// const { text } = await generateText({
//   model: google("gemini-1.5-flash"),
//   prompt: "Write a vegetarian lasagna recipe for 4 people.",
// });
// console.log(text);

export async function generateClassifieds(
  image: string
): Promise<ClientMessage | null> {
  const uiStream = createStreamableUI();
  const value = createStreamableValue<StreambleSkeletonProps>();
  let classified = { image } as StreambleSkeletonProps;
  uiStream.update(<StreambleSkeleton {...classified} />);

  async function processEvents() {
    const { object: taxonomy } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: ClassifiedTaxonomyAISchema,
      system:
        "You are an expert at analysing images of vahicles and responding with a structured JSON object based on the schema provided.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are tasked with returning the structure data for the vehicle in the image provided.",
            },
            { type: "image", image },
          ],
        },
      ] as CoreMessage[],
    });
    classified.title =
      `${taxonomy.year} ${taxonomy.make} ${taxonomy.model} ${taxonomy.modelVariant ? `${taxonomy.modelVariant}` : ""}`.trim();

    const foundtaxonomy = await mapTaxonomyToCreate({
      year: taxonomy.year,
      make: taxonomy.make,
      model: taxonomy.model,
      modelVariant: taxonomy.modelVariant,
    });
    if (foundtaxonomy) {
      const make = await prisma.make.findFirst({
        where: { name: foundtaxonomy.make },
      });
      if (make) {
        classified = {
          ...classified,
          ...foundtaxonomy,
          make,
          makeId: make.id,
        };
      }
    }
    uiStream.update(<StreambleSkeleton done={true} {...classified} />);
    value.update(classified);
    uiStream.done();
    value.done();
  }

  processEvents();
  return {
    id: Date.now(),
    display: uiStream.value,
    role: "assistant" as const,
    classified: value.value,
  };
}

type ServerMessage = {
  id?: number;
  name?: string;
  role: "user" | "assistant" | "system";
  content: UserContent;
};

export type ClientMessage = {
  id: number;
  display: ReactNode;
  role: "user" | "assistant";
  classified: StreamableValue<StreambleSkeletonProps>;
};

export const Ai = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: { generateClassifieds },
});
