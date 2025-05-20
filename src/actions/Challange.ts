"use server";

import { issueChallange } from "@/lib/otp";
import { auth } from "@auth";

export const resendChallangeAction = async () => {
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
