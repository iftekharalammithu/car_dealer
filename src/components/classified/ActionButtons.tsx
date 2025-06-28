"use client";
import { deleteClassifiedAction } from "@/actions/Classified";
import { ClassifiedWithImages } from "@/config/types";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { EyeIcon, Loader2, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/route";
import { Tooltip } from "react-tooltip";

const ActionButtons = ({
  classified,
}: {
  classified: ClassifiedWithImages;
}) => {
  const [isPending, startTransition] = useTransition();
  const deleteClassified = (id: string) => {
    startTransition(async () => {
      const result = await deleteClassifiedAction(id);
      if (result.success) {
        toast.success("Classified Deleted!", { description: result.message });
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
        onClick={() => deleteClassified(classified.id)}
      >
        <Tooltip id="trash-tooltip"></Tooltip>
        {isPending ? (
          <Loader2 className=" h-4 w-4 animate-spin"></Loader2>
        ) : (
          <Trash className=" h-4 w-4 animate-spin"></Trash>
        )}
      </Button>
      <Button
        data-tooltip-id="view-tooltip"
        data-tooltip-content="View"
        className=" p-2 h-fit"
        asChild
      >
        <Tooltip id="view-tooltip"></Tooltip>
        <Link href={routes.singleClassified(classified.slug)}>
          <EyeIcon className=" h-4 w-4 animate-spin"></EyeIcon>
        </Link>
      </Button>
      <Button
        data-tooltip-id="edit-tooltip"
        data-tooltip-content="Edit"
        className=" p-2 h-fit"
        asChild
      >
        <Tooltip id="edit-tooltip"></Tooltip>
        <Link href={routes.admin.editclassified(classified.id)}>
          <PencilIcon className=" h-4 w-4 animate-spin"></PencilIcon>
        </Link>
      </Button>
    </div>
  );
};

export default ActionButtons;
