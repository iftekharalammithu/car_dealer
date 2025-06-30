"use client";
import { updateCustomerAction } from "@/actions/customer";
import {
  editCustomerSchema,
  EditCustomerType,
} from "@/app/schemas/Customer.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, CustomerStatus } from "@prisma/client";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Select from "../ui/select";
import { formatCustomerStatus } from "@/lib/utils";

const EditCustomerForm = (props: { customer: Customer }) => {
  const { customer } = props;
  const form = useForm<EditCustomerType>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      status: customer.status,
    },
  });
  const [, startTransition] = useTransition();

  const onChangeHandler: SubmitHandler<EditCustomerType> = (data) => {
    startTransition(async () => {
      const result = await updateCustomerAction({
        id: customer.id,
        status: data.status,
      });
      if (result.success) {
        toast.success("Customer Updated!", { description: result.message });
      } else {
        toast.error("Error To Update Customer!", {
          description: result.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onChangeHandler)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field: { ...rest } }) => (
            <FormItem>
              <FormLabel className=" text-muted " htmlFor="status">
                Status
              </FormLabel>
              <FormControl>
                <Select
                  options={Object.values(CustomerStatus).map((value) => ({
                    label: formatCustomerStatus(value),
                    value,
                  }))}
                  {...rest}
                  noDefault={false}
                  selectClassName=" bg-primary border-transparent text-muted"
                ></Select>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

export default EditCustomerForm;
