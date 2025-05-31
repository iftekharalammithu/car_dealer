"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { readStreamableValue, useActions } from "ai/rsc";
import { Ai } from "@/actions/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SingleImageSchema,
  SingleImageType,
} from "@/app/schemas/Images.Schema";
import { z } from "zod";
import { ClassifieddAiSchema } from "@/app/schemas/Classified-Schema-ai";
import { createClassifiedAction } from "@/actions/Classified";
import { toast } from "sonner";

export default function CreateClassifiedDialog() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isUpLoading, startUpLoadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();

  const { generateClassifieds } = useActions<typeof Ai>();
  const { messages, setMessage } = useState<typeof Ai>();

  const imageForm = useForm<SingleImageType>({
    resolver: zodResolver(SingleImageSchema),
  });

  const FullSchema = ClassifieddAiSchema.extend({
    make: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  });

  type StreambleSkeletonProps = z.infer<typeof FullSchema>;

  const createForm = useForm<StreambleSkeletonProps>({
    resolver: zodResolver(FullSchema),
  });

  const handleImageUpload = (url: string) => {
    imageForm.setValue("image", url);
  };
  const onImageSubmit: SubmitHandler<SingleImageType> = (data) => {
    startUpLoadTransition(async () => {
      const responseMessage = await generateClassifieds(data.image);
      if (!responseMessage) {
        return;
      }
      setMessage((currentMessages) => [...currentMessages, responseMessage]);
      for await (const value of readStreamableValue(
        responseMessage.classified
      )) {
        if (value) {
          createForm.reset(value);
        }
      }
    });
  };

  const onCreateSubmit: SubmitHandler<StreambleSkeletonProps> = (data) => {
    startCreateTransition(async () => {
      setMessage([]);
      const { success, message } = await createClassifiedAction(data);
      if (!success) {
        toast.error("Error", {
          description: message,
        });
        return;
      }
    });
  };
  return (
    <Dialog open={true} onOpenChange={() => null}>
      <DialogTrigger asChild>
        <Button className=" ml-4" size={"sm"}>
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("min-w-6xl  bg-white")}>
        <DialogHeader>
          <DialogTitle>Create New Classified</DialogTitle>
        </DialogHeader>
        {/* <StreambleSkeleton></StreambleSkeleton> */}
      </DialogContent>
    </Dialog>
  );
}
