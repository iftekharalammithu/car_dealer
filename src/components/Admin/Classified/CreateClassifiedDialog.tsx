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
import { readStreamableValue, useActions, useUIState } from "ai/rsc";
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
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import ImageUploader from "./ImageUploader";
import StreambleSkeleton from "./StreambleSkeleton";

export default function CreateClassifiedDialog() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isUpLoading, startUpLoadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();

  const { generateClassifieds } = useActions<typeof Ai>();
  const [messages, setMessage] = useUIState<typeof Ai>();

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
    // console.log(data);
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
    // console.log(data);
    startCreateTransition(async () => {
      setMessage([]);
      const { success, message, error } = await createClassifiedAction(data);
      if (!success) {
        // console.log(error);
        toast.error("Error", {
          description: error,
        });
        return;
      }
    });
  };
  return (
    <Dialog open={true} onOpenChange={setIsModelOpen}>
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
        {messages?.length ? (
          <Form {...createForm}>
            <form
              className=" space-y-4"
              onSubmit={createForm.handleSubmit(onCreateSubmit)}
            >
              {messages.map((message) => {
                return (
                  <div className=" w-full" key={message.id}>
                    {message.display}
                  </div>
                );
              })}
              <div className="flex justify-between gap-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setIsModelOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className=" flex items-center gap-x-2"
                  disabled={isCreating || isUpLoading}
                >
                  {isCreating ||
                    (isUpLoading ? (
                      <Loader2 className=" animate-spin h-4 w-4"></Loader2>
                    ) : null)}
                  {isUpLoading ? "Uploading..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...imageForm}>
            <form
              className=" space-y-4"
              onSubmit={imageForm.handleSubmit(onImageSubmit)}
            >
              <ImageUploader
                onUploadComplete={handleImageUpload}
              ></ImageUploader>
              <div className=" flex justify-between gap-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setIsModelOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className=" flex items-center gap-x-2"
                  disabled={isUpLoading}
                >
                  {isUpLoading && (
                    <Loader2 className=" animate-spin h-4 w-4"></Loader2>
                  )}
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
