import { auth } from "@/auth";
import { routes } from "@/config/route";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

export const logoutOfAllSession = async () => {
  const session = await auth();
  if (!session.user.id) {
    return null;
  }

  await prisma.session.deleteMany({
    where: { userId: session.user.id },
  });
  redirect(routes.signIn);
};
