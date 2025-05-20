import { env } from "process";
import Challange from "../../emails/challange";
import { bcryptPasswordhashed } from "./bcrypt";
import { redis } from "./radis_store";
import { resend } from "./resend";

const REDIS_PREFIX = "otp";

export async function issueChallange(userId: string, email: string) {
  const array = new Uint32Array(1);
  const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
  const hash = await bcryptPasswordhashed(code.toString());
  const challange = { codeHash: hash, email };

  await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 60 * 60, challange);
  const { error } = await resend.emails.send({
    from: env.FROM_EMAIL_ADDRESS,
    to: email,
    subject: `Sign in to Car Dealer OTP`,
    html: `<p>${code} </p>`,
    react: Challange({ data: { code } }),
  });
  if (error) {
    console.log(error);
    throw new Error(`Error sending email ${error.name} - ${error.message}`);
  }
}
