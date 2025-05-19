import { auth } from "@auth";
import React from "react";

const ChallengePage = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <div>
      <h2>{JSON.stringify(session, null, 2)}</h2>
    </div>
  );
};

export default ChallengePage;
