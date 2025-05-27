"use server";
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  StreamableValue,
} from "ai/rsc";
import { UserContent } from "ai";
import { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import StreambleSkeleton from "@/components/Admin/Classified/StreambleSkeleton";

const { text } = await generateText({
  model: google("gemini-1.5-flash"),
  prompt: "Write a vegetarian lasagna recipe for 4 people.",
});
console.log(text);

export async function generateClassifieds(
  image: string
): Promise<ClientMessage | null> {
  const uiStream = createStreamableUI();
  const value = createStreamableValue<any>();
  let classified = { image };
  uiStream.update(<StreambleSkeleton {...classified} />);

  return null;
}

type ServerMessage = {
  id?: number;
  name?: string;
  role: "user" | "assistant" | "system";
  content: UserContent;
};

export type ClientMessage = {
  id?: number;
  display: ReactNode;
  role: "user" | "assistant";
  classified: StreamableValue<any>;
};

export const Ai = createAI({
  initialUIState: [] as ServerMessage[],
  initialAIState: [],
  actions: { generateClassifieds },
});
