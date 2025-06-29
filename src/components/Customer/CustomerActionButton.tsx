"use client";
import { CustomerWithClassified } from "@/config/types";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/route";
import { Tooltip } from "react-tooltip";
import { deleteCustomerAction } from "@/actions/customer";

const CustomerActionButtons = ({
  customer,
}: {
  customer: CustomerWithClassified;
}) => {
  const [isPending, startTransition] = useTransition();
  const deleteCustomer = (id: string) => {
    startTransition(async () => {
      const result = await deleteCustomerAction(id);
      if (result.success) {
        toast.success("Customer Deleted!", { description: result.message });
      } else {
        toast.error("Error To Deleted!", { description: result.message });
      }
    });
  };

  return (
    <div>
      <Button
        className=" p-2 h-fit"
        variant={"destructive"}
        data-tooltip-id="trash-tooltip"
        data-tooltip-content="Delete"
        onClick={() => deleteCustomer(customer.id)}
      >
        <Tooltip id="trash-tooltip"></Tooltip>
        {isPending ? (
          <Loader2 className=" h-4 w-4 animate-spin"></Loader2>
        ) : (
          <Trash className=" h-4 w-4 animate-spin"></Trash>
        )}
      </Button>

      <Button
        data-tooltip-id="edit-tooltip"
        data-tooltip-content="Edit"
        className=" p-2 h-fit"
        asChild
      >
        <Tooltip id="edit-tooltip"></Tooltip>
        <Link href={routes.admin.editCustomer(customer.id)}>
          <PencilIcon className=" h-4 w-4 animate-spin"></PencilIcon>
        </Link>
      </Button>
    </div>
  );
};

export default CustomerActionButtons;
