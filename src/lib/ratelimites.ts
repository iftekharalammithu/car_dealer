import { PrevState } from "@/config/types";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { differenceInMinutes } from "date-fns";
import { headers } from "next/headers";

const ratelimiteLogin = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
});

const ratelimiteOtp = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
});

async function generateRateLimiter(type: "otp" | "login") {
  const headerslist = await headers();
  const ip = headerslist.get("x-forwarded-for") ?? "";
  return type === "otp" ? ratelimiteOtp.limit(ip) : ratelimiteLogin.limit(ip);
}

export async function genericRatelimiter(
  type: "otp" | "login"
): Promise<PrevState | undefined> {
  const { success, reset } = await generateRateLimiter(type);
  const resetTime = new Date(reset);
  const now = new Date();
  const differentsinSeconds = Math.round(
    resetTime.getTime() - now.getTime() / 1000
  );

  if (!success) {
    if (differentsinSeconds > 60) {
      const resetTimeInMinutes = differenceInMinutes(resetTime, now);
      return {
        success: false,
        message: `Too many attempts.Try again in  ${resetTimeInMinutes} Minute`,
      };
    }
    return {
      success: false,
      message: `Too many attempts.Try again in  ${differentsinSeconds} Minute`,
    };
  }
}
