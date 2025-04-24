"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

export default function Home() {
  const [search, setSearch] = useQueryState("search");

  return (
    <div className="flex min-h-screen flex-col">
      <h1>Hello world</h1>
      <Button
        onClick={() =>
          toast.success("Success", {
            description: "This is a success toast",
          })
        }
        className=" text-yellow-400"
      >
        Button
      </Button>
      <Button>
        {" "}
        <Link href={"/sdfd/inventory"}>Invantory</Link>
      </Button>
      <div className="p-4">
        <input
          type="text"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border p-2"
        />
        <p className="mt-2 text-gray-600">Search value: {search}</p>
      </div>
    </div>
  );
}
