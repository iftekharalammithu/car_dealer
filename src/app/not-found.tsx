// app/not-found.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <style jsx>{`
        @keyframes driveAnimation {
          0% {
            transform: translateX(-50px);
          }
          50% {
            transform: translateX(200px);
          }
          100% {
            transform: translateX(-50px);
          }
        }
        .animated-car {
          animation: driveAnimation 4s infinite ease-in-out;
        }
      `}</style>

      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="relative w-64 h-24 mb-8 mx-auto">
          {/* Road */}

          <div className="absolute bottom-0 w-full h-2 bg-gray-700"></div>

          {/* Car SVG with animation */}
          <div className="absolute bottom-2 animated-car">
            <svg viewBox="0 0 100 40" width="100" height="40">
              {/* Car body */}
              <rect
                x="10"
                y="15"
                width="80"
                height="15"
                rx="3"
                fill="#3b82f6"
              />
              <rect x="20" y="5" width="50" height="15" rx="3" fill="#3b82f6" />

              {/* Windows */}
              <rect x="25" y="8" width="15" height="10" rx="1" fill="#bfdbfe" />
              <rect x="50" y="8" width="15" height="10" rx="1" fill="#bfdbfe" />

              {/* Wheels */}
              <circle cx="25" cy="30" r="8" fill="#1f2937" />
              <circle cx="25" cy="30" r="4" fill="#9ca3af" />
              <circle cx="75" cy="30" r="8" fill="#1f2937" />
              <circle cx="75" cy="30" r="4" fill="#9ca3af" />

              {/* Lights */}
              <rect x="10" y="20" width="5" height="5" fill="#fcd34d" />
              <rect x="85" y="20" width="5" height="5" fill="#ef4444" />

              {/* Exhaust Smoke */}
              <circle cx="8" cy="25" r="2" fill="#9ca3af" opacity="0.7">
                <animate
                  attributeName="opacity"
                  values="0.7;0.3;0"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="25;22;20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="5" cy="24" r="1.5" fill="#9ca3af" opacity="0.5">
                <animate
                  attributeName="opacity"
                  values="0.5;0.2;0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="24;21;18"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          Redirecting to home page in <span className="font-bold">3</span>{" "}
          seconds...
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go Home Now
        </Link>
      </div>
    </div>
  );
}
