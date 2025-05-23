"use client";
import { usePathname } from "next/navigation";

export default function Page() {
  const path = usePathname();
  return (
    <div>
      <h1>{path}</h1>
    </div>
  );
}
