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
import StreambleSkeleton from "./StreambleSkeleton";

export default function CreateClassifiedDialog() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isUpLoading, startUpLoadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();

  return (
    <Dialog open={true} onOpenChange={() => null}>
      <DialogTrigger asChild>
        <Button className=" ml-4" size={"sm"}>
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("max-w-6xl bg-white")}>
        <DialogHeader>
          <DialogTitle>Create New Classified</DialogTitle>
        </DialogHeader>
        <StreambleSkeleton></StreambleSkeleton>
      </DialogContent>
    </Dialog>
  );
}
