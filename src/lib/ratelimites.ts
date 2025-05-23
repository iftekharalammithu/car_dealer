import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
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

export async function genericRatelimiter(type: "otp" | "login") {
  const { success, reset } = await generateRateLimiter(type);
  const resetTime = new Date();
  const now = new Date();
  const differents = Math.round(resetTime.getTime() - now.getTime() / 1000);
}
