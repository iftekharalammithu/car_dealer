"use server";

import { SignSchema } from "@/app/schemas/Signin.Schema";
import { PrevState } from "@/config/types";
import { signIn } from "@/auth";
import { genericRatelimiter } from "@/lib/ratelimites";

export const signInAction = async (_: PrevState, formData: FormData) => {
  try {
    // console.log("Form Data", formData);
    const limiterError = await genericRatelimiter("login");
    if (limiterError) {
      return limiterError;
    }
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, success, error } = SignSchema.safeParse({
      email,
      password,
    });

    if (!success) {
      console.log(error);
      return { success: false, message: "Invalid Credentials" };
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // redirectTo: routes.challenge,
    });
    return { success: true, message: "Signed in Successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Invalid Credentials!" };
  }
};
