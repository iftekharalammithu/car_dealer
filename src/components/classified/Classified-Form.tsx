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

interface ClassifiedFormProps {
  classified: ClassifiedWithImages;
}

const Classified_Form = ({ classified }: ClassifiedFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<updateClassifiedType>({
    resolver: zodResolver(updateClassifiedSchema),
    defaultValues: {},
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
        <form onSubmit={form.handleSubmit(classifiedSubmit)}></form>
      </Form>
    </div>
  );
};

export default Classified_Form;
