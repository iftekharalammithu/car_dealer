import OtpForm from "@/components/Auth/OtpForm";
// import { auth } from "@/auth";
import React from "react";

const ChallengePage = async () => {
  // const session = await auth();
  // console.log("session", session);
  return (
    <div>
      <OtpForm></OtpForm>
    </div>
  );
};

export default ChallengePage;
