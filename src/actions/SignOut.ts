"use server";
import { routes } from "@/config/route";
import { auth, signOut } from "@auth";

export const SignOutAction = async () => {
  const session = await auth();
  if (session) {
    await signOut({
      redirect: true,
      redirectTo: routes.signIn,
    });
  }
};
