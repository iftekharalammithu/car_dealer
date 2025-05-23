import { env } from "process";
import Challange from "../../emails/challange";
import { bcryptPasswordCompare, bcryptPasswordhashed } from "./bcrypt";
import { redis } from "./radis_store";
import { resend } from "./resend";
import prisma from "./prismadb";

const REDIS_PREFIX = "otp";

export async function issueChallange(userId: string, email: string) {
  const array = new Uint32Array(1);
  const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
  // console.log(code);
  const hash = await bcryptPasswordhashed(code.toString());
  const challange = { codeHash: hash, email };

  await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 10 * 60, challange);
  const { error } = await resend.emails.send({
    from: env.FROM_EMAIL_ADDRESS,
    to: email,
    subject: `Sign in to Car Dealer OTP`,
    react: Challange({ data: { code } }),
  });
  if (error) {
    console.log(error);
    throw new Error(`Error sending email ${error.name} - ${error.message}`);
  }
}

interface Challenge {
  codeHash: string;
  email: string;
}
export const completeChallenge = async (userId: string, code: string) => {
  // console.log("user id", userId);
  const challenge = await redis.get<Challenge>(`${REDIS_PREFIX}:uid-${userId}`);
  // console.log(challenge);
  if (challenge) {
    const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
    // console.log(isCorrect);

    if (isCorrect) {
      const session = await prisma.session.findFirst({
        where: { userId, requires2FA: true },
      });

      // console.log(session);
      if (session) {
        // console.log("Token", session.sessionToken);
        await prisma.session.updateMany({
          where: { sessionToken: session.sessionToken, userId },
          data: {
            requires2FA: false,
          },
        });
        await redis.del(`${REDIS_PREFIX}:uid-${userId}`);
        // console.log("2FA enabled successfully");

        return { success: true, messsage: "2FA enabled successfully" };
      }
      return {
        success: false,
        message: "Could not find the session for the User",
      };
    }
    return {
      success: false,
      message: "Incorrect Verification Code- Please try again",
    };
  }
  return {
    success: false,
    message: "Challenge does not exist- Please try again",
  };
};
