"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-body  items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold animate-fade-in">
          Welcome to Car Dealer
        </h1>
        <p className="text-lg font-medium animate-fade-in delay-200">
          Find your dream car with ease and convenience.
        </p>
      </div>
      {/* Buttons Section */}
      <div className="mt-10 flex space-x-4">
        <Button
          onClick={() =>
            toast.success("Success", {
              description: "This is a success toast",
            })
          }
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-transform transform hover:scale-105 animate-bounce"
        >
          Get Started
        </Button>

        <Link href="/inventory">
          <Button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105">
            View Inventory
          </Button>
        </Link>
      </div>
    </main>
  );
}
