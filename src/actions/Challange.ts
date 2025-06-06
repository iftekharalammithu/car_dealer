"use server";
import { completeChallenge, issueChallange } from "@/lib/otp";
import { auth } from "@/auth";
import { genericRatelimiter } from "@/lib/ratelimites";

export const resendChallangeAction = async () => {
  const limiterError = await genericRatelimiter("otp");
  if (limiterError) {
    return limiterError;
  }
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  await issueChallange(session.user.id as string, session.user.email as string);

  return {
    success: true,
    message: "Code Sent",
  };
};

export const completeChallangeAction = async (code: string) => {
  const session = await auth();
  // console.log("sess", session);

  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  const { id } = session.user;
  const result = await completeChallenge(id as string, code);
  return result;
};
