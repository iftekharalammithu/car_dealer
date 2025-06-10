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
import {
  ClassifiedDetailsSchema,
  ClassifiedTaxonomyAISchema,
} from "@/app/schemas/Classified-Schema-ai";
import { mapTaxonomyToCreate } from "@/lib/ai-utils";
import prisma from "@/lib/prismadb";

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

    // console.log(classified.title);

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
    // console.log(classified);

    uiStream.update(<StreambleSkeleton {...classified} />);
    const { object: details } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: ClassifiedDetailsSchema,
      system:
        "You are an expert at writing vehicle description and generate the structured data . the description should be accurate and atleast 50 words long. ",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Based on the image provided. Your tasked with determining the odometer reading(random), doors, seats, ULEZ compliance, transmission type, color, fuel type, body type, and odometer unit , drive type , VRM and any addition details in the schema provided for the ${classified.title}. you must be accurate when determining the values for these properties even if the image is not clear . `,
            },
            { type: "image", image },
          ],
        },
      ] as CoreMessage[],
    });

    classified = { ...classified, ...details };
    uiStream.update(<StreambleSkeleton done={true} {...classified} />);
    console.log(classified);
    // console.log("Details", details);

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
